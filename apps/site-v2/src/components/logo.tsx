import type { SVGProps } from "react";

interface LogoIconProps {
  attributes?: SVGProps<SVGSVGElement>;
  className?: string;
}

export function Logo({
  attributes = { role: "graphics-symbol" },
  className,
}: LogoIconProps) {
  return (
    <svg
      width="125"
      height="61"
      {...attributes}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 1214 593"
    >
      <title>The Bikeshed Podcast</title>
      <path
        d="M331.539 555.36V546.983H357.76C361.376 546.983 364.606 546.253 367.447 544.792C370.375 543.332 372.657 541.27 374.293 538.607C376.015 535.857 376.876 532.593 376.876 528.812C376.876 525.032 376.015 521.811 374.293 519.147C372.657 516.398 370.375 514.293 367.447 512.833C364.606 511.286 361.376 510.513 357.76 510.513H331.539V502.265H358.406C363.745 502.265 368.524 503.382 372.743 505.616C376.962 507.764 380.278 510.814 382.689 514.766C385.186 518.718 386.434 523.4 386.434 528.812C386.434 534.139 385.186 538.821 382.689 542.859C380.278 546.811 376.962 549.904 372.743 552.138C368.524 554.286 363.745 555.36 358.406 555.36H331.539ZM325.469 590.928V502.265H334.898V590.928H325.469Z"
        fill="currentColor"
      />
      <path
        d="M440.505 592.217C434.219 592.217 428.364 591.057 422.939 588.737C417.6 586.332 412.907 583.067 408.86 578.943C404.813 574.733 401.627 569.879 399.302 564.381C397.063 558.796 395.944 552.825 395.944 546.468C395.944 540.024 397.063 534.053 399.302 528.555C401.541 523.056 404.684 518.245 408.731 514.121C412.778 509.997 417.471 506.776 422.81 504.456C428.149 502.136 433.961 500.977 440.247 500.977C446.533 500.977 452.345 502.136 457.684 504.456C463.109 506.776 467.845 509.997 471.892 514.121C475.94 518.245 479.083 523.099 481.321 528.684C483.56 534.182 484.68 540.153 484.68 546.597C484.68 552.954 483.56 558.925 481.321 564.51C479.083 570.008 475.94 574.819 471.892 578.943C467.931 583.067 463.281 586.332 457.943 588.737C452.604 591.057 446.791 592.217 440.505 592.217ZM440.247 583.067C446.964 583.067 452.905 581.477 458.072 578.299C463.324 575.12 467.415 570.781 470.342 565.283C473.356 559.784 474.863 553.513 474.863 546.468C474.863 541.227 474.002 536.416 472.28 532.034C470.558 527.567 468.147 523.701 465.047 520.436C461.947 517.085 458.287 514.508 454.068 512.704C449.934 510.9 445.328 509.997 440.247 509.997C433.617 509.997 427.675 511.587 422.422 514.766C417.256 517.859 413.166 522.154 410.152 527.653C407.224 533.151 405.76 539.423 405.76 546.468C405.76 551.708 406.621 556.563 408.343 561.03C410.066 565.498 412.477 569.407 415.577 572.757C418.677 576.022 422.336 578.556 426.556 580.361C430.775 582.165 435.339 583.067 440.247 583.067Z"
        fill="currentColor"
      />
      <path
        d="M505.238 590.928V582.165H531.33C538.305 582.165 544.461 580.661 549.8 577.654C555.139 574.561 559.315 570.352 562.329 565.025C565.343 559.612 566.85 553.427 566.85 546.468C566.85 539.509 565.343 533.366 562.329 528.039C559.315 522.713 555.139 518.546 549.8 515.539C544.461 512.446 538.305 510.9 531.33 510.9H505.497V502.265H531.588C538.046 502.265 543.988 503.382 549.413 505.616C554.924 507.764 559.703 510.857 563.75 514.895C567.883 518.847 571.069 523.529 573.308 528.941C575.547 534.268 576.667 540.153 576.667 546.597C576.667 552.868 575.547 558.71 573.308 564.123C571.069 569.535 567.926 574.261 563.879 578.299C559.832 582.251 555.053 585.344 549.542 587.577C544.117 589.811 538.218 590.928 531.846 590.928H505.238ZM499.426 590.928V502.265H508.855V590.928H499.426Z"
        fill="currentColor"
      />
      <path
        d="M631.623 592.217C625.251 592.217 619.31 591.057 613.799 588.737C608.374 586.417 603.638 583.153 599.591 578.943C595.543 574.733 592.4 569.879 590.162 564.381C588.009 558.796 586.932 552.825 586.932 546.468C586.932 540.11 588.009 534.182 590.162 528.684C592.4 523.099 595.5 518.245 599.461 514.121C603.509 509.997 608.245 506.776 613.67 504.456C619.094 502.136 624.95 500.977 631.236 500.977C638.039 500.977 644.109 502.179 649.448 504.585C654.873 506.991 659.609 510.298 663.656 514.508L657.198 520.951C654.098 517.515 650.352 514.852 645.961 512.961C641.569 510.985 636.661 509.997 631.236 509.997C626.242 509.997 621.635 510.9 617.415 512.704C613.282 514.508 609.622 517.085 606.436 520.436C603.336 523.701 600.925 527.567 599.203 532.034C597.567 536.416 596.749 541.227 596.749 546.468C596.749 551.708 597.61 556.563 599.332 561.03C601.055 565.498 603.466 569.407 606.566 572.757C609.666 576.022 613.325 578.556 617.544 580.361C621.764 582.165 626.371 583.067 631.365 583.067C637.048 583.067 642.086 582.079 646.477 580.103C650.955 578.127 654.744 575.421 657.844 571.984L664.302 578.556C660.341 582.766 655.605 586.117 650.094 588.608C644.583 591.014 638.426 592.217 631.623 592.217Z"
        fill="currentColor"
      />
      <path
        d="M668.436 590.928L704.86 502.265H711.964L748.001 590.928H737.797L706.41 512.575H710.156L678.511 590.928H668.436ZM685.098 567.86V559.484H731.597V567.86H685.098Z"
        fill="currentColor"
      />
      <path
        d="M781.245 592.217C774.357 592.217 768.415 590.928 763.421 588.351C758.426 585.687 754.035 581.993 750.246 577.268L756.833 570.824C759.847 575.034 763.335 578.17 767.296 580.232C771.343 582.294 776.122 583.325 781.633 583.325C787.316 583.325 791.923 582.036 795.453 579.458C798.984 576.881 800.749 573.316 800.749 568.762C800.749 565.24 799.931 562.362 798.295 560.128C796.659 557.808 794.506 555.961 791.837 554.587C789.254 553.126 786.369 551.837 783.183 550.72C779.997 549.604 776.811 548.444 773.625 547.241C770.525 545.952 767.64 544.363 764.971 542.473C762.301 540.583 760.148 538.177 758.512 535.256C756.962 532.335 756.187 528.598 756.187 524.044C756.187 519.233 757.35 515.109 759.675 511.673C762 508.236 765.186 505.616 769.233 503.812C773.28 501.922 777.887 500.977 783.054 500.977C788.823 500.977 793.947 502.093 798.424 504.327C802.988 506.561 806.777 509.568 809.791 513.348L803.333 519.792C800.577 516.527 797.563 514.035 794.291 512.317C791.019 510.599 787.187 509.74 782.795 509.74C777.629 509.74 773.496 510.943 770.396 513.348C767.296 515.754 765.746 519.104 765.746 523.4C765.746 526.751 766.521 529.457 768.071 531.519C769.707 533.581 771.859 535.299 774.529 536.674C777.198 538.048 780.083 539.294 783.183 540.411C786.369 541.442 789.555 542.602 792.741 543.89C795.927 545.179 798.812 546.811 801.395 548.787C804.064 550.763 806.217 553.298 807.853 556.391C809.489 559.398 810.307 563.264 810.307 567.989C810.307 575.635 807.681 581.606 802.428 585.902C797.262 590.112 790.201 592.217 781.245 592.217Z"
        fill="currentColor"
      />
      <path
        d="M844.766 590.928V504.714H854.324V590.928H844.766ZM813.508 510.9V502.265H885.582V510.9H813.508Z"
        fill="currentColor"
      />
      <path
        d="M521.873 199.366V113.217H533.988V199.366H521.873ZM491.457 121.652V110.66H564.276V121.652H491.457Z"
        fill="currentColor"
      />
      <path
        d="M575.13 199.366V110.66H587.245V199.366H575.13ZM632.87 199.366V110.66H644.984V199.366H632.87ZM583.379 158.975V147.983H635.834V158.975H583.379Z"
        fill="currentColor"
      />
      <path
        d="M662.548 199.366V110.66H674.663V199.366H662.548ZM670.797 199.366V188.373H722.092V199.366H670.797ZM670.797 159.231V148.75H717.839V159.231H670.797ZM670.797 121.652V110.66H721.447V121.652H670.797Z"
        fill="currentColor"
      />
      <path
        d="M607.001 0L1038.25 159.015V185.517L607.001 26.5025L175.754 185.517V159.015L607.001 0Z"
        fill="currentColor"
      />
      <path
        d="M574.245 434.207C585.084 439.016 597.987 441.42 612.955 441.42C634.804 441.42 651.923 436.525 664.31 426.736C676.697 416.774 682.891 403.12 682.891 385.774C682.891 376.328 681.342 368.427 678.245 362.072C675.149 355.546 671.02 350.222 665.858 346.1C660.869 341.806 655.364 338.285 649.342 335.537C643.321 332.789 637.213 330.385 631.02 328.324C624.998 326.263 619.407 324.202 614.245 322.141C609.256 320.08 605.213 317.676 602.116 314.928C599.019 312.008 597.471 308.229 597.471 303.592C597.471 298.611 599.536 294.833 603.665 292.257C607.794 289.509 613.385 288.135 620.439 288.135C627.493 288.135 633.772 289.509 639.278 292.257C644.955 295.005 650.546 299.213 656.052 304.88L682.375 278.86C675.493 271.132 666.719 265.035 656.052 260.569C645.557 256.104 633.944 253.871 621.213 253.871C608.654 253.871 597.557 256.018 587.923 260.312C578.288 264.434 570.718 270.531 565.213 278.603C559.88 286.675 557.213 296.293 557.213 307.457C557.213 316.731 558.761 324.46 561.858 330.643C564.955 336.654 568.998 341.72 573.987 345.842C579.148 349.792 584.74 353.142 590.761 355.89C596.783 358.466 602.804 360.784 608.826 362.845C615.019 364.906 620.611 367.053 625.6 369.286C630.761 371.519 634.891 374.181 637.987 377.272C641.084 380.364 642.632 384.4 642.632 389.38C642.632 394.876 640.224 399.17 635.407 402.262C630.761 405.353 624.138 406.899 615.536 406.899C606.073 406.899 597.729 405.095 590.503 401.489C583.449 397.71 576.998 392.472 571.148 385.774L544.826 411.794C553.772 421.755 563.578 429.226 574.245 434.207Z"
        fill="currentColor"
      />
      <path
        d="M78.1938 256.705H0V319.443H57.3942V304.164H23.9842C18.1853 304.164 13.4844 299.463 13.4844 293.664C13.4844 287.865 18.1853 283.164 23.9842 283.164H64.0744C68.6009 283.164 72.4584 286.029 73.9333 290.043C75.5165 291.747 76.4848 294.03 76.4848 296.54V329.678C77.1682 330.386 77.777 331.187 78.2912 332.078L96.2013 363.099C100.266 362.023 104.535 361.45 108.937 361.45C113.454 361.45 117.83 362.053 121.989 363.184C127.409 364.597 132.463 366.914 136.981 369.966C134.911 363.582 131.487 357.859 126.71 352.798C122.439 348.179 117.225 344.365 111.068 341.354C115.458 338.917 119.21 336.033 122.323 332.704C129.549 324.975 133.162 315.529 133.162 304.365C133.162 295.606 131.011 287.62 126.71 280.406C122.409 273.193 116.129 267.439 107.871 263.145C99.7852 258.852 89.8927 256.705 78.1938 256.705Z"
        fill="currentColor"
      />
      <path
        d="M139.315 387.954C138.975 397.055 136.494 405.345 131.871 412.824C127.054 420.725 120 426.993 110.71 431.631C102.711 435.699 93.2553 437.982 82.3433 438.482C75.1921 431.542 70.7482 421.829 70.7482 411.077C70.7482 401.181 74.5134 392.164 80.6893 385.381L95.9053 411.735C99.2983 417.612 106.813 419.626 112.69 416.233C118.567 412.84 120.58 405.325 117.187 399.448L102.199 373.488C104.384 373.099 106.633 372.896 108.929 372.896C121.324 372.896 132.34 378.803 139.315 387.954Z"
        fill="currentColor"
      />
      <path
        d="M67.6105 438.586H0V408.546L63.2723 355.214L74.7527 375.098C65.2355 384.141 59.3019 396.921 59.3019 411.085C59.3019 421.257 62.3615 430.714 67.6105 438.586Z"
        fill="currentColor"
      />
      <path d="M0 376.722L38.5117 344.261H0V376.722Z" fill="currentColor" />
      <path
        d="M161.739 438.586V256.705H202.255V438.586H161.739Z"
        fill="currentColor"
      />
      <path
        d="M274.276 349.085L343.953 438.586H394.276L317.982 343.264L391.695 256.705H341.631L274.276 338.752V256.705H233.76V438.586H274.276V349.085Z"
        fill="currentColor"
      />
      <path
        d="M407.595 438.586V256.705H537.144V291.484H448.111V328.839H529.402V362.588H448.111V403.55H538.434V438.586H407.595Z"
        fill="currentColor"
      />
      <path
        d="M705.115 438.586V256.705H745.631V327.551H817.889V256.705H858.664V438.586H817.889V362.588H745.631V438.586H705.115Z"
        fill="currentColor"
      />
      <path
        d="M890.039 256.705V438.586H1020.88V403.55H930.555V362.588H1011.85V328.839H930.555V291.484H1019.59V256.705H890.039Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1118.26 256.705H1045.23V438.586H1118.77C1132.37 438.586 1144.92 436.354 1156.45 431.888C1168.15 427.423 1178.3 421.154 1186.9 413.082C1195.51 405.01 1202.13 395.392 1206.77 384.228C1211.59 373.064 1214 360.87 1214 347.646C1214 334.249 1211.59 322.055 1206.77 311.063C1202.13 299.9 1195.42 290.282 1186.65 282.21C1178.04 273.966 1167.89 267.697 1156.19 263.403C1144.67 258.938 1132.02 256.705 1118.26 256.705ZM1085.74 403.034H1117.74C1128.75 403.034 1138.39 400.888 1146.65 396.594C1154.9 392.128 1161.27 385.688 1165.74 377.272C1170.22 368.857 1172.45 358.895 1172.45 347.388C1172.45 335.881 1170.13 326.005 1165.48 317.761C1161.01 309.518 1154.65 303.163 1146.39 298.697C1138.3 294.232 1128.75 291.999 1117.74 291.999H1085.74V403.034Z"
        fill="currentColor"
      />
    </svg>
  );
}
