export class Band {
  constructor(
    private id: string,
    private name: string,
    private musicGenre: string,
    private responsible: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public getResponsible(): string {
    return this.responsible;
  }

  public setResponsible(value: string) {
    this.responsible = value;
  }

  public getMusicGenre(): string {
    return this.musicGenre;
  }

  public setMusicGenre(value: string) {
    this.musicGenre = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string) {
    this.name = value;
  }

  public BandToDB(): BandToDB {
    return {
      id: this.id,
      name: this.name,
      responsible: this.responsible,
      music_genre: this.musicGenre,
    };
  }
}

export interface BandInputDTO {
  name: string;
  musicGenre: string;
  responsible: string;
}

export interface BandToDB {
  id: string;
  name: string;
  responsible: string;
  music_genre: string;
}
