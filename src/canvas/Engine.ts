import { Explorer } from '../core/Explorer';
import { Renderer } from './Renderer';
import { Input } from './Input';





export class Engine {

  private renderer: Renderer;

  private input: Input;

  constructor(
    canvas: HTMLCanvasElement,
    private explorer: Explorer
){

    this.renderer = new Renderer(canvas, explorer);

    this.input = new Input(
        canvas,
        explorer
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