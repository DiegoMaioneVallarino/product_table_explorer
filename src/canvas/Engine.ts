import { Camera } from './Camera';
import { Renderer } from './Renderer';
import { Input } from './Input';

export class Engine {

  private renderer: Renderer;

  private input: Input;

  constructor(
    canvas: HTMLCanvasElement,
    private camera: Camera
  ) {

    this.renderer = new Renderer(canvas, camera);

    this.input = new Input(
        canvas,
        camera
    );

  }

  public start(): void {

    this.renderer.render();

    this.input.start();

  }

  public stop(): void {

    this.input.stop();
  
    this.renderer.destroy();
  
  }

  public redraw(): void {

    this.renderer.redraw();

  }

}