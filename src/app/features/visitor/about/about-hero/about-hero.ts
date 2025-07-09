import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-about-hero',
  imports: [],
  template: `
    <article>
      <h2
        class="text-accent decoration-text mb-3 text-2xl font-semibold underline"
      >
        Ce qui m’anime
      </h2>
      <div class="content">
        <p class="mb-4 text-lg leading-relaxed">
          {{ aboutText() }}
        </p>

        <p class="mb-6 text-lg leading-relaxed">
          {{ aboutTextBis() }}
        </p>
      </div>
    </article>
  `,
})
export class AboutHero {
  aboutText = signal(
    "Je suis passionné par le code propre et durable, je considère chaque ligne comme une brique essentielle d'un\n        ensemble cohérent, lisible et maintenable. Mon approche repose sur une architecture modulaire, conçue pour\n        évoluer sereinement avec les équipes et les exigences techniques. Je m'attache à concevoir des interfaces\n        claires, accessibles et centrées sur l'utilisateur, pour répondre à des besoins concrets avec sens et\n        efficacité. Ce qui me motive avant tout, c'est d'écrire un code structuré, testé et pérenne. Je privilégie\n        des solutions simples, robustes et durables, en restant à l'écoute des usages pour garantir une expérience\n        fluide, pertinente et évolutive.",
  );
  aboutTextBis = signal(
    "J'accorde une importance particulière à la qualité du code, à l'expérience utilisateur et à l'accessibilité.\n        Mon approche combine rigueur technique et créativité pour concevoir des solutions adaptées aux besoins des\n        utilisateurs.",
  );
}
