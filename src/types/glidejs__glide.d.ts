declare module '@glidejs/glide' {
  export default class Glide {
    constructor(selector: string | HTMLElement, options?: any);
    mount(extensions?: any): Glide;
    destroy(): void;
    update(settings?: any): void;
    go(pattern: string): void;
    pause(): void;
    play(interval?: number): void;
  }
}