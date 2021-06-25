import { Request, Response } from "express";
import { BandInputDTO } from "../model/Band";

export default class BandController {
  public async registerBand(req: Request, res: Response) {
    try {
      const input: BandInputDTO = {
        musicGenre: req.body.musicGenre,
        name: req.body.name,
        responsible: req.body.responsible,
      };
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  public async bandById(req: Request, res: Response) {
    try {
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}
