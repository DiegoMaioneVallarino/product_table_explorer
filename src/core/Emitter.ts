/** Notificador mínimo sin payload: suscribirse devuelve la función para cancelar. */
export class Emitter {

  private readonly listeners = new Set<() => void>();

  public subscribe(listener: () => void): () => void {

    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };

  }

  public emit(): void {

    for (const listener of this.listeners) {
      listener();
    }

  }

}
