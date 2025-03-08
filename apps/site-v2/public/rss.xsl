<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom"><xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/><xsl:template match="/"><xsl:variable name="title"><xsl:value-of select="/rss/channel/title"/></xsl:variable><xsl:variable name="description"><xsl:value-of select="/rss/channel/description"/></xsl:variable><xsl:variable name="link"><xsl:value-of select="/rss/channel/link"/></xsl:variable><html class="dark scroll-smooth"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="referrer" content="unsafe-url"/><title><xsl:value-of select="$title"/></title><style>*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-transtone-x:0;--tw-transtone-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-transtone-x:0;--tw-transtone-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }

        /*! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e7e7f0}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#a8a8b8}input::placeholder,textarea::placeholder{opacity:1;color:#a8a8b8}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}:root{--card-radius:0.75rem;--btn-radius:var(--card-radius);--badge-radius:var(--btn-radius);--input-radius:var(--btn-radius);--avatar-radius:9999px;--annonce-radius:var(--avatar-radius);--ui-border-color:#1f1f31;--btn-border:#1f1f31;--badge-border:var(--btn-border);--input-border:var(--ui-border-color);--ui-disabled-border:#121220;--ui-error-border:#e11d48;--ui-success-border:#65a30d;--input-outline:#4f46e5;--ui-bg:rgb(18 18 32/var(--ui-bg-opacity));--ui-soft-bg:#1f1f31;--overlay-bg:rgba(2,2,13,.25);--input-bg:var(--ui-soft-bg);--ui-disabled-bg:#121220;--card-padding:1.5rem;--display-text-color:#fff;--title-text-color:var(--display-text-color);--body-text-color:#d6d6e1;--caption-text-color:#6e6e81;--placeholder-text-color:#4d4d5f;--ui-bg-opacity:1;color:var(--body-text-color)}*,.border{border-color:var(--ui-border-color)}button:disabled{border:none!important;background:var(--ui-disabled-bg)!important;background-image:none!important;box-shadow:none!important;color:var(--placeholder-text-color)!important;pointer-events:none!important}button:disabled:before{content:var(--tw-content);display:none}a:focus-visible,button:focus-visible{outline-width:2px;outline-offset:2px;outline-color:#4f46e5}a:focus-visible:focus-visible,button:focus-visible:focus-visible{outline-style:solid}input:user-invalid,select:user-invalid,textarea:user-invalid{--input-border:var(--ui-error-border);--ui-border-color:var(--ui-error-border);--input-outline:var(--ui-error-border);--title-text-color:#fb7185}[data-rounded=none]{--card-radius:0px;--avatar-radius:0px}[data-rounded=default]{--card-radius:0.25rem}[data-rounded=small]{--card-radius:0.125rem}[data-rounded=medium]{--card-radius:0.375rem}[data-rounded=large]{--card-radius:0.5rem}[data-rounded=xlarge]{--card-radius:0.75rem}[data-rounded="2xlarge"]{--card-radius:1rem;--input-radius:0.75rem}[data-rounded="3xlarge"]{--card-radius:1.5rem;--input-radius:0.75rem}[data-rounded=full]{--card-radius:1.5rem;--btn-radius:9999px;--input-radius:1rem}[data-shade=glassy]{--ui-bd-blur:40px;--ui-bg-opacity:0.75;--ui-bg:rgb(58 58 75/var(--ui-bg-opacity));--ui-border-color:rgba(250,250,254,.1);--ui-soft-bg:rgba(77,77,95,.5)}[data-shade="800"]{--ui-border-color:#3a3a4b;--ui-bg:#1f1f31;--ui-soft-bg:#121220}[data-shade="900"]{--ui-border-color:#1f1f31;--ui-bg:#121220;--ui-soft-bg:#1f1f31}[data-shade="950"]{--ui-border-color:#1f1f31;--ui-bg:#02020d;--ui-soft-bg:#1f1f31}.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.icon-\[tabler--rss\]{display:inline-block;width:1em;height:1em;background-color:currentColor;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;--svg:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 19a1 1 0 1 0 2 0 1 1 0 1 0-2 0M4 4a16 16 0 0 1 16 16M4 11a9 9 0 0 1 9 9'/%3E%3C/svg%3E")}.link{--tw-text-opacity:1;color:rgb(129 140 248/var(--tw-text-opacity,1));transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.link.variant-ghost:hover,.link.variant-underlined{text-decoration-line:underline}.link.variant-animated{position:relative}.link.variant-animated:before{position:absolute;left:0;right:0;bottom:0;height:1px;transform-origin:right;--tw-scale-x:0;transform:transtone(var(--tw-transtone-x),var(--tw-transtone-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);content:var(--tw-content);transition-duration:.2s}.link.variant-animated:hover:before{transform-origin:left;content:var(--tw-content);--tw-scale-x:1;transform:transtone(var(--tw-transtone-x),var(--tw-transtone-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.link.intent-info{--tw-text-opacity:1;color:rgb(96 165 250/var(--tw-text-opacity,1))}.link.intent-neutral{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.link.variant-animated.intent-neutral:before{content:var(--tw-content);background-color:hsla(0,0%,100%,.5)}.link.variant-animated.intent-info:before{content:var(--tw-content);--tw-bg-opacity:1;background-color:rgb(37 99 235/var(--tw-bg-opacity,1))}.link.variant-animated.intent-primary:before{content:var(--tw-content);--tw-bg-opacity:1;background-color:rgb(79 70 229/var(--tw-bg-opacity,1))}.link.variant-ghost.intent-neutral,.link.variant-underlined.intent-neutral{text-decoration-color:hsla(0,0%,100%,.5)}.mx-auto{margin-left:auto;margin-right:auto}.my-2{margin-top:.5rem;margin-bottom:.5rem}.my-6{margin-top:1.5rem;margin-bottom:1.5rem}.-mt-5{margin-top:-1.25rem}.ml-4{margin-left:1rem}.mr-1{margin-right:.25rem}.mr-2{margin-right:.5rem}.mt-1{margin-top:.25rem}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.hidden{display:none}.h-8{height:2rem}.min-h-screen{min-height:100vh}.min-h-svh{min-height:100svh}.w-24{width:6rem}.w-8{width:2rem}.max-w-full{max-width:100%}.max-w-screen-lg{max-width:1024px}.flex-1{flex:1 1 0%}.grow{flex-grow:1}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-2{gap:.5rem}.gap-x-4{-moz-column-gap:1rem;column-gap:1rem}.gap-y-2{row-gap:.5rem}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.5rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem*var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem*var(--tw-space-y-reverse))}.space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1.5rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem*var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.scroll-smooth{scroll-behavior:smooth}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bg-gray-925{--tw-bg-opacity:1;background-color:rgb(9 9 21/var(--tw-bg-opacity,1))}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.from-primary-600{--tw-gradient-from:#4f46e5 var(--tw-gradient-from-position);--tw-gradient-to:rgba(79,70,229,0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.to-accent-400{--tw-gradient-to:#e879f9 var(--tw-gradient-to-position)}.bg-clip-text{-webkit-background-clip:text;background-clip:text}.p-1{padding:.25rem}.px-4{padding-left:1rem;padding-right:1rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.pb-2{padding-bottom:.5rem}.pt-2{padding-top:.5rem}.text-center{text-align:center}.font-sans{font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.text-2xl{font-size:1.5rem;line-height:2rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-semibold{font-weight:600}.leading-normal{line-height:1.5}.text-transparent{color:transparent}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.text-title{color:var(--title-text-color)}.text-body{color:var(--body-text-color)}.\!text-caption{color:var(--caption-text-color)!important}.text-caption{color:var(--caption-text-color)}.dark{--display-text-color:#fff;--title-text-color:var(--display-text-color);--caption-text-color:#6e6e81;--body-text-color:#d6d6e1;--placeholder-text-color:#4d4d5f;--ui-border-color:#232323}[data-shade="900"]:where(.dark,.dark *),[data-shade="925"]:where(.dark,.dark *),[data-shade="950"]:where(.dark,.dark *){--ui-border-color:#383838}@media (min-width:640px){.sm\:gap-1{gap:.25rem}}@media (min-width:768px){.md\:flex-row{flex-direction:row}.md\:space-y-0>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0px*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0px*var(--tw-space-y-reverse))}.md\:p-4{padding:1rem}.md\:px-6{padding-left:1.5rem;padding-right:1.5rem}.md\:pt-6{padding-top:1.5rem}}@media (min-width:1024px){.lg\:dark\:bg-gray-900:is(.dark *){--tw-bg-opacity:1;background-color:rgb(18 18 32/var(--tw-bg-opacity,1))}}</style></head><body class="bg-gray-925 min-h-screen min-h-svh font-sans leading-normal antialiased lg:dark:bg-gray-900"><main class="min-w-screen container mx-auto flex min-h-screen max-w-screen-lg flex-col px-4 py-6 md:px-6"><header class="space-y-2 pt-2 md:pt-6"><a title="{$title}" href="{$link}" target="_blank" rel="noopener noreferrer"><h1 class="flex text-2xl"><span class="icon-[tabler--rss] mr-2 h-8 w-8"/><span class="lg2:text-3xl from-primary-600 to-accent-400 inline-block bg-gradient-to-r bg-clip-text font-bold text-transparent"><xsl:value-of select="$title" disable-output-escaping="yes"/></span></h1></a><p class="text-body pt-2 text-lg py-4"><xsl:value-of select="$description" disable-output-escaping="yes"/></p><p class="text-caption text-sm">
              This RSS feed for the
              <a class="link intent-neutral variant-animated !text-caption font-bold" title="{$title}" href="{$link}" target="_blank" rel="noopener noreferrer"><xsl:value-of select="$title"/></a>
              website.
            </p><p class="text-body text-sm hidden" id="subscribe-links">
              You can subscribe this RSS feed by
              <a class="link intent-neutral variant-animated font-bold" title="Feedly" data-href="https://feedly.com/i/subscription/feed/" target="_blank" rel="noopener noreferrer">Feedly</a>,
              <a class="link intent-neutral variant-animated font-bold" title="Inoreader" data-href="https://www.inoreader.com/feed/" target="_blank" rel="noopener noreferrer">Inoreader</a>,
              <a class="link intent-neutral variant-animated font-bold" title="Newsblur" data-href="https://www.newsblur.com/?url=" target="_blank" rel="noopener noreferrer">Newsblur</a>,
              <a class="link intent-neutral variant-animated font-bold" title="Follow" data-href="follow://add?url=" rel="noopener noreferrer">Follow</a>,
              <a class="link intent-neutral variant-animated font-bold" title="RSS Reader" data-href="feed:" data-raw="true" rel="noopener noreferrer">RSS Reader</a>
              or
              <a class="link intent-neutral variant-animated font-bold" title="{$title} 's feed source" data-href="" data-raw="true" rel="noopener noreferrer">View Source</a>.
            </p><script>
              document.addEventListener('DOMContentLoaded', function () {
                document.querySelectorAll('a[data-href]').forEach(function (a) {
                  const url = new URL(location.href)
                  const feed = url.searchParams.get('url') || location.href
                  const raw = a.getAttribute('data-raw')
                  if (raw) {
                    a.href = a.getAttribute('data-href') + feed
                  } else {
                    a.href = a.getAttribute('data-href') + encodeURIComponent(feed)
                  }
                })
                document.getElementById('subscribe-links').classList.remove('hidden')
              })
            </script></header><hr class="my-6"/><section class="flex-1 space-y-6 p-1 md:p-4"><xsl:choose><xsl:when test="/rss/channel/item"><xsl:for-each select="/rss/channel/item"><article class="space-y-2"><details><summary class="max-w-full truncate"><xsl:if test="title"><h2 class="text-title inline cursor-pointer text-lg font-semibold"><xsl:value-of select="title" disable-output-escaping="yes"/></h2></xsl:if><xsl:if test="pubDate"><time class="text-caption ml-4 mt-1 block text-sm"><xsl:value-of select="pubDate"/></time></xsl:if></summary><div class="text-body px-4 py-2"><p class="my-2"><xsl:choose><xsl:when test="description"><xsl:value-of select="description" disable-output-escaping="yes"/></xsl:when></xsl:choose></p><xsl:if test="link"><a class="link variant-animated intent-neutral font-bold" href="{link}" target="_blank" rel="noopener noreferrer">
                            Read More
                          </a></xsl:if></div></details></article></xsl:for-each></xsl:when><xsl:when test="/atom:feed/atom:entry"><xsl:for-each select="/atom:feed/atom:entry"><article class="space-y-2"><details><summary class="max-w-full truncate"><xsl:if test="atom:title"><h2 class="text-title inline cursor-pointer text-lg font-semibold"><xsl:value-of select="atom:title" disable-output-escaping="yes"/></h2></xsl:if><xsl:if test="atom:updated"><time class="text-caption ml-4 mt-1 block text-sm"><xsl:value-of select="atom:updated"/></time></xsl:if></summary><div class="text-body px-4 py-2"><p class="my-2"><xsl:choose><xsl:when test="atom:summary"><xsl:value-of select="atom:summary" disable-output-escaping="yes"/></xsl:when><xsl:when test="atom:content"><xsl:value-of select="atom:content" disable-output-escaping="yes"/></xsl:when></xsl:choose></p><xsl:if test="atom:link/@href"><a class="link variant-animated intent-neutral font-bold" href="{atom:link/@href}" target="_blank" rel="noopener noreferrer">
                            Read More
                          </a></xsl:if></div></details></article></xsl:for-each></xsl:when></xsl:choose></section><hr class="my-6"/></main></body></html></xsl:template></xsl:stylesheet>
