import express, { Request, Response, Application } from "express"; // import express
import { request } from "http";

const app: Application = express(); // create express app

app.use(express.json()); // For creating body object inside middleware request object

const port: number = 3000; // Port number, where API works

// Http response codes
const responseCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  notFound: 404,
};
interface Ojoud {
  id: number;
  firstName: string;
  lastName: string;
}
interface Oaine {
  id: number;
  oppejoudId: number;
  kursus: number;
  aine: string;
  toimumisAeg: string;
}
interface Db {
  oppejoud: Ojoud[];
  oppeaine: Oaine[];
}
// Dummy database

const db: Db = {
  oppejoud: [
    {
      id: 1,
      firstName: "Martti",
      lastName: "Raavel",
    },
    {
      id: 2,
      firstName: "Laura",
      lastName: "Hein",
    },
    {
      id: 3,
      firstName: "Hans",
      lastName: "Solo",
    },
  ],
  oppeaine: [
    {
      id: 1,
      oppejoudId: 1,
      kursus: 2,
      aine: "Programmeerimine II",
      toimumisAeg:
        "Neljapäev, 30.09.2021  14:15-17:30, Laupäev 13.11.2021 14:15-17:30",
    },
    {
      id: 2,
      oppejoudId: 1,
      kursus: 1,
      aine: "Riistvara ja operatsioonisüsteemide alused",
      toimumisAeg:
        "Reede, 08.10.2021  14:15-17:30,Neljapäev 21.10.2021 10:00-13:15",
    },
    {
      id: 3,
      oppejoudId: 2,
      kursus: 1,
      aine: "Kujundusgraafika",
      toimumisAeg:
        "Neljapäev, 07.10.2021  14:15-17:30, Reede 22.10.2021 10:00-13:15",
    },
    {
      id: 4,
      oppejoudId: 2,
      kursus: 2,
      aine: "Kujundusgraafika II",
      toimumisAeg:
        "Reede, 01.10.2021  14:15-17:30, Laupäev 16.10.2021 14:15-17:30",
    },
  ],
};

// Konkreetne õppejõud ja tema antavad ained

app.get("/oppejoud/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const oppejoud = db.oppejoud.find((element) => element.id === id);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: "No valid id provided",
    });
  }
  if (!oppejoud) {
    return res.status(responseCodes.badRequest).json({
      error: `No user found with id: ${id}`,
    });
  } else {
    let oppeained = [];
    for (let i = 0; i < db.oppeaine.length; i++) {
      let temp = db.oppeaine.find(
        (element) => element.id === i && element.oppejoudId === id
      );

      oppeained.push(temp);
    }
    return res.status(responseCodes.ok).json({
      oppejoud,
      oppeained,
    });
  }
});

// Õppejõu kustutamine ainult siis kui tal antavaid aineid pole.

app.delete("/oppejoud/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: "No valid id provided",
    });
  }
  const index = db.oppejoud.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      message: `User not found with id: ${id}`,
    });
  } else {
    const index2 = db.oppeaine.findIndex(
      (element) => element.oppejoudId !== id
    );
    if (index2 !== id) {
      db.oppejoud.splice(index, 1);
      return res.status(responseCodes.noContent).send();
    }
  }
});

// Uue Õppejõu lisamine koos aine/ainetega - ained on kohtustulikud

app.post("/oppejoud", (req: Request, res: Response) => {
  const { firstName, lastName, kursus, aine, toimumisAeg } = req.body;
  if (!firstName) {
    return res.status(responseCodes.badRequest).json({
      error: "First name is required",
    });
  }
  if (!lastName) {
    return res.status(responseCodes.badRequest).json({
      error: "Last name is required",
    });
  }
  if (!aine) {
    return res.status(responseCodes.badRequest).json({
      error: "Course is required",
    });
  } else {
    let id = db.oppejoud.length + 1;
    const oppejoudId = id;
    db.oppejoud.push({
      id,
      firstName,
      lastName,
    });

    id = db.oppeaine.length + 1;
    db.oppeaine.push({
      id,
      oppejoudId,
      kursus,
      aine,
      toimumisAeg,
    });
    return res.status(responseCodes.created).json({
      id,
    });
  }
});
//   Õppeaine andmete uuendamine, muudame kursust ja toimumis aega

app.patch("/oppeaine/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { kursus, toimumisAeg } = req.body;
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: "No valid id provided",
    });
  }
  if (!kursus && !toimumisAeg) {
    return res.status(responseCodes.badRequest).json({
      error: "Nothing to update",
    });
  }
  const index = db.oppeaine.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      error: `No user found with id: ${id}`,
    });
  }
  if (kursus) {
    db.oppeaine[index].kursus = parseInt(kursus, 10);
  }
  if (toimumisAeg) {
    db.oppeaine[index].toimumisAeg = toimumisAeg;
  }
  return res.status(responseCodes.noContent).send();
});

// Paneme API käima
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
