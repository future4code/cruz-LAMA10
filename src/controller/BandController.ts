import { Request, Response } from "express";
import { BandInputDTO } from "../model/Band";
import bandBusiness from "../business/band/BandBusiness";

export default class BandController {
  public async registerBand(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      const input: BandInputDTO = {
        musicGenre: req.body.musicGenre,
        name: req.body.name,
        responsible: req.body.responsible,
      };
      const message = await bandBusiness.createBand(input, token);
      res.status(201).send({ message });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  public async getBand(req: Request, res: Response) {
    try {
      const name = req.body.name;
      const id = req.body.id;
      const band = await bandBusiness.getBandBy(id, name);

      res.status(200).send({ band });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}
