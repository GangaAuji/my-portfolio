export function AboutScene() {
  return (
    <svg
      className="about-scene"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="24 48 952 600"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="scene-blue" x1="0" y1="0" x2="1" y2="1">
          <stop className="scene-grad-a" />
          <stop className="scene-grad-b" offset="1" />
        </linearGradient>
        <filter id="scene-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="scene-link">
        <path d="M280 125H350L390 205" />
        <path d="M720 125H650L610 205" />
        <path d="M280 320H345L390 320" />
        <path d="M720 320H655L610 320" />
        <path d="M280 520H350L400 430" />
        <path d="M720 520H650L600 430" />
        <path d="M500 150V190" />
        <path d="M500 455V490" />
      </g>

      <g className="scene-float">
        <rect className="scene-shell" x="373" y="190" width="254" height="244" rx="22" />
        <rect className="scene-screen" x="385" y="202" width="230" height="155" rx="12" />
        <path className="scene-chrome" d="M385 230H615" />
        <circle cx="399" cy="216" r="3" fill="#F87171" />
        <circle cx="410" cy="216" r="3" fill="#FBBF24" />
        <circle cx="421" cy="216" r="3" fill="#4ADE80" />
        <g className="scene-term">
          <text className="scene-cmd" x="400" y="251">
            $ deploy --production
          </text>
          <text className="scene-ok" x="400" y="274">
            ✓ Build successful
          </text>
          <text className="scene-ok" x="400" y="295">
            ✓ Tests passed
          </text>
          <text className="scene-ok" x="400" y="316">
            ✓ Services healthy
          </text>
          <rect className="scene-caret" x="400" y="331" width="5" height="11" rx="1" />
        </g>
        <path className="scene-stand" d="M475 357V375H525V357" />
        <path className="scene-foot" d="M454 380H546L559 387H441Z" />
        <rect className="scene-deck" x="426" y="393" width="148" height="6" rx="3" />
        <path className="scene-pulse scene-stroke-blue" d="M442 393H498" strokeWidth="3" />
        <circle className="scene-halo" cx="500" cy="457" r="24" />
        <path className="scene-skin" d="M488 453Q483 436 500 433Q517 436 512 453L508 461H492Z" />
        <path className="scene-hair" d="M486 448Q481 430 499 428Q518 428 516 447L510 440L499 436L488 443Z" />
        <path d="M490 462L500 472L510 462L527 471L535 490H465L473 471Z" fill="url(#scene-blue)" />
        <path className="scene-collar" d="M487 464L500 472L513 464" />
      </g>

      <g className="scene-float">
        <rect className="scene-card" x="35" y="65" width="245" height="120" rx="16" />
        <rect className="scene-fill-blue" x="35" y="65" width="4" height="120" rx="2" />
        <rect className="scene-well-blue" x="53" y="82" width="43" height="43" rx="12" />
        <g className="scene-stroke-blue">
          <path d="M64 96L59 103L64 110M77 96L82 103L77 110M73 93L68 113" />
        </g>
        <text className="scene-label" x="53" y="149">
          Automation
        </text>
        <text className="scene-sub" x="53" y="167">
          Scripts · Workflows · Jobs
        </text>
        <circle className="scene-pulse scene-fill-blue" cx="258" cy="83" r="4" />
      </g>

      <g className="scene-float" style={{ animationDelay: ".4s" }}>
        <rect className="scene-card" x="720" y="65" width="245" height="120" rx="16" />
        <rect className="scene-fill-violet" x="961" y="65" width="4" height="120" rx="2" />
        <rect className="scene-well-violet" x="738" y="82" width="43" height="43" rx="12" />
        <g className="scene-stroke-violet">
          <circle cx="753" cy="97" r="5" />
          <circle cx="768" cy="100" r="4" />
          <path d="M743 114Q744 103 753 103Q763 103 764 114M764 109Q770 103 777 111" />
        </g>
        <text className="scene-label" x="738" y="149">
          Collaboration
        </text>
        <text className="scene-sub" x="738" y="167">
          Teams · Shared ownership
        </text>
        <circle className="scene-pulse scene-fill-violet" cx="943" cy="83" r="4" />
      </g>

      <g className="scene-float" style={{ animationDelay: ".6s" }}>
        <rect className="scene-card" x="35" y="260" width="245" height="120" rx="16" />
        <rect className="scene-fill-cyan" x="35" y="260" width="4" height="120" rx="2" />
        <rect className="scene-well-cyan" x="53" y="277" width="43" height="43" rx="12" />
        <g className="scene-stroke-cyan">
          <rect x="61" y="286" width="10" height="24" rx="2" />
          <rect x="77" y="286" width="10" height="24" rx="2" />
          <path d="M71 298H77" />
        </g>
        <text className="scene-label" x="53" y="344">
          CI / CD
        </text>
        <text className="scene-sub" x="53" y="362">
          Build · Test · Deploy
        </text>
        <circle className="scene-pulse scene-fill-cyan" cx="258" cy="278" r="4" />
      </g>

      <g className="scene-float" style={{ animationDelay: ".8s" }}>
        <rect className="scene-card" x="720" y="260" width="245" height="120" rx="16" />
        <rect className="scene-fill-amber" x="961" y="260" width="4" height="120" rx="2" />
        <rect className="scene-well-amber" x="738" y="277" width="43" height="43" rx="12" />
        <g className="scene-stroke-amber">
          <path d="M759 285L771 290V300Q771 310 759 315Q747 310 747 300V290Z" />
          <path d="M754 300L758 304L765 296" />
        </g>
        <text className="scene-label" x="738" y="344">
          Security
        </text>
        <text className="scene-sub" x="738" y="362">
          DevSecOps · Access · Scanning
        </text>
        <circle className="scene-pulse scene-fill-amber" cx="943" cy="278" r="4" />
      </g>

      <g className="scene-float" style={{ animationDelay: "1s" }}>
        <rect className="scene-card" x="35" y="455" width="245" height="120" rx="16" />
        <rect className="scene-fill-green" x="35" y="455" width="4" height="120" rx="2" />
        <rect className="scene-well-green" x="53" y="472" width="43" height="43" rx="12" />
        <g className="scene-stroke-green">
          <path d="M60 501V487H87V506H60Z" />
          <path d="M63 498L69 493L75 498L81 486" />
        </g>
        <text className="scene-label" x="53" y="539">
          Monitoring
        </text>
        <text className="scene-sub" x="53" y="557">
          Metrics · Logs · Alerts
        </text>
        <circle className="scene-pulse scene-fill-green" cx="258" cy="473" r="4" />
      </g>

      <g className="scene-float" style={{ animationDelay: ".5s" }}>
        <rect className="scene-card" x="720" y="455" width="245" height="120" rx="16" />
        <rect className="scene-fill-cyan" x="961" y="455" width="4" height="120" rx="2" />
        <rect className="scene-well-cyan" x="738" y="472" width="43" height="43" rx="12" />
        <path
          className="scene-stroke-cyan"
          d="M748 503H771Q779 503 779 495Q779 488 771 488Q768 479 759 482Q751 482 751 491Q744 491 744 497Q744 503 748 503Z"
        />
        <text className="scene-label" x="738" y="539">
          Cloud Infrastructure
        </text>
        <text className="scene-sub" x="738" y="557">
          AWS · Azure · Cloud Platforms
        </text>
        <circle className="scene-pulse scene-fill-cyan" cx="943" cy="473" r="4" />
      </g>

      <g className="scene-float" style={{ animationDelay: "1.2s" }}>
        <rect className="scene-card" x="305" y="515" width="190" height="120" rx="16" />
        <rect className="scene-fill-violet" x="305" y="515" width="4" height="120" rx="2" />
        <rect className="scene-well-violet" x="321" y="531" width="38" height="38" rx="10" />
        <g className="scene-stroke-violet">
          <path d="M340 537L350 550L340 563L330 550Z" />
          <path d="M340 542V558M334 550H346" />
        </g>
        <text className="scene-label" x="321" y="589">
          Infrastructure
        </text>
        <text className="scene-label" x="321" y="606">
          as Code
        </text>
        <text className="scene-sub" x="321" y="622">
          Terraform · Ansible
        </text>
      </g>

      <g className="scene-float" style={{ animationDelay: ".9s" }}>
        <rect className="scene-card" x="505" y="515" width="190" height="120" rx="16" />
        <rect className="scene-fill-blue" x="691" y="515" width="4" height="120" rx="2" />
        <rect className="scene-well-blue" x="521" y="531" width="38" height="38" rx="10" />
        <g className="scene-stroke-blue">
          <path d="M528 543H552V558H528Z" />
          <path d="M528 548H552M536 543V558M544 543V558" />
          <path d="M524 539H532M535 539H543M546 539H554" />
        </g>
        <text className="scene-label" x="521" y="589">
          Containers
        </text>
        <text className="scene-sub" x="521" y="607">
          Docker · Kubernetes
        </text>
      </g>

      <g filter="url(#scene-glow)">
        <circle className="scene-blink scene-fill-blue" r="3">
          <animateMotion dur="4s" repeatCount="indefinite" path="M280 125H350L390 205" />
        </circle>
        <circle className="scene-blink scene-fill-violet" r="3">
          <animateMotion dur="4.8s" repeatCount="indefinite" path="M720 125H650L610 205" />
        </circle>
        <circle className="scene-blink scene-fill-cyan" r="3">
          <animateMotion dur="4.3s" repeatCount="indefinite" path="M280 320H345L390 320" />
        </circle>
        <circle className="scene-blink scene-fill-green" r="3">
          <animateMotion dur="5s" repeatCount="indefinite" path="M720 520H650L600 430" />
        </circle>
      </g>

      <g className="scene-pulse" filter="url(#scene-glow)">
        <circle className="scene-fill-blue" cx="500" cy="181" r="4" />
        <circle className="scene-fill-blue" cx="390" cy="205" r="4" />
        <circle className="scene-fill-violet" cx="610" cy="205" r="4" />
        <circle className="scene-fill-cyan" cx="390" cy="320" r="4" />
        <circle className="scene-fill-amber" cx="610" cy="320" r="4" />
      </g>
    </svg>
  );
}
