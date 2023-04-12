import { useRef, useState } from "react";
// import Image from 'next/image'
import clsx from "clsx";
import { motion, useInView, useMotionValue } from "framer-motion";
import Image from "next/future/image";

import logoDrupal from "../../../../public/images/logos/logo-drupal.svg";
import logoFreecodecamp from "../../../../public/images/logos/logo-freecodecamp.svg";
import logoGo from "../../../../public/images/logos/logo-go.svg";
import logoGoogle from "../../../../public/images/logos/logo-google.svg";
import logoMaterialUI from "../../../../public/images/logos/logo-materialui.svg";
import logoOpenshift from "../../../../public/images/logos/logo-openshift.svg";
import logoUber from "../../../../public/images/logos/logo-uber.svg";
import logoZillow from "../../../../public/images/logos/logo-zillow.svg";
import { AppScreenWithoutMenu } from "./AppScreen";
import { Button } from "./Button";
import { Container } from "./Container";
import { PhoneFrameToggleScreen } from "./PhoneFrame";
import { Portfolio } from "./Portfolio";

function BackgroundIllustration(props) {
  let id = "background-illustration" + Math.random().toString(36).substr(2, 9);

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#9e9e9e" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#9e9e9e"
        stroke="#9e9e9e"
      />
    </svg>
  );
}

const prices = [
  997.56, 944.34, 972.25, 832.4, 888.76, 834.8, 805.56, 767.38, 861.21, 669.6,
  694.39, 721.32, 694.03, 610.1, 502.2, 549.56, 611.03, 583.4, 610.14, 660.6,
  752.11, 721.19, 638.89, 661.7, 694.51, 580.3, 638.0, 613.3, 651.64, 560.51,
  611.45, 670.68, 752.56,
];
const maxPrice = Math.max(...prices);
const minPrice = Math.min(...prices);

function Chart({
  className,
  activePointIndex,
  onChangeActivePointIndex,
  width: totalWidth,
  height: totalHeight,
  paddingX = 0,
  paddingY = 0,
  gridLines = 6,
  ...props
}) {
  let width = totalWidth - paddingX * 2;
  let height = totalHeight - paddingY * 2;

  let id = "chart" + Math.random().toString(36).substr(2, 9);
  let svgRef = useRef();
  let pathRef = useRef();
  let isInView = useInView(svgRef, { amount: 0.5, once: true });
  let pathWidth = useMotionValue(0);
  let [interactionEnabled, setInteractionEnabled] = useState(false);

  let path = "";
  let points = [];

  for (let index = 0; index < prices.length; index++) {
    let x = paddingX + (index / (prices.length - 1)) * width;
    let y =
      paddingY +
      (1 - (prices[index] - minPrice) / (maxPrice - minPrice)) * height;
    points.push({ x, y });
    path += `${index === 0 ? "M" : "L"} ${x.toFixed(4)} ${y.toFixed(4)}`;
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      className={clsx(className, "overflow-visible")}
      {...(interactionEnabled
        ? {
            onPointerLeave: () => onChangeActivePointIndex(null),
            onPointerMove: (event) => {
              let x = event.nativeEvent.offsetX;
              let closestPointIndex;
              let closestDistance = Infinity;
              for (
                let pointIndex = 0;
                pointIndex < points.length;
                pointIndex++
              ) {
                let point = points[pointIndex];
                let distance = Math.abs(point.x - x);
                if (distance < closestDistance) {
                  closestDistance = distance;
                  closestPointIndex = pointIndex;
                } else {
                  break;
                }
              }
              onChangeActivePointIndex(closestPointIndex);
            },
          }
        : {})}
      {...props}
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={`${path} V ${height + paddingY} H ${paddingX} Z`} />
        </clipPath>
        <linearGradient id={`${id}-gradient`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#13B5C8" />
          <stop offset="100%" stopColor="#13B5C8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[...Array(gridLines - 1).keys()].map((index) => (
        <line
          key={index}
          stroke="#a3a3a3"
          opacity="0.1"
          x1="0"
          y1={(totalHeight / gridLines) * (index + 1)}
          x2={totalWidth}
          y2={(totalHeight / gridLines) * (index + 1)}
        />
      ))}
      <motion.rect
        y={paddingY}
        width={pathWidth}
        height={height}
        fill={`url(#${id}-gradient)`}
        clipPath={`url(#${id}-clip)`}
        opacity="0.5"
      />
      <motion.path
        ref={pathRef}
        d={path}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        transition={{ duration: 1 }}
        {...(isInView ? { stroke: "#06b6d4", animate: { pathLength: 1 } } : {})}
        onUpdate={({ pathLength }) => {
          pathWidth.set(
            pathRef.current.getPointAtLength(
              pathLength * pathRef.current.getTotalLength()
            ).x
          );
        }}
        onAnimationComplete={() => setInteractionEnabled(true)}
      />
      {activePointIndex !== null && (
        <>
          <line
            x1="0"
            y1={points[activePointIndex].y}
            x2={totalWidth}
            y2={points[activePointIndex].y}
            stroke="#06b6d4"
            strokeDasharray="1 3"
          />
          <circle
            r="4"
            cx={points[activePointIndex].x}
            cy={points[activePointIndex].y}
            fill="#fff"
            strokeWidth="2"
            stroke="#06b6d4"
          />
        </>
      )}
    </svg>
  );
}

function AppDemo() {
  return (
    <AppScreenWithoutMenu>
      <Portfolio />
    </AppScreenWithoutMenu>
  );
}

export function Hero() {
  return (
    <div className="overflow-hidden py-8 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <a
              href="https://github.com/stagehq/"
              className="mb-10 flex h-10 w-fit cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white pl-4 pr-2 text-sm font-medium text-zinc-600"
            >
              We are now
              <span className="flex h-7 items-center rounded-full border border-cyan-800/10 bg-cyan-100 px-3 text-sm font-medium text-cyan-700">
                open source
              </span>
            </a>
            <h1 className="text-landing-3xl font-medium tracking-tight text-gray-900 sm:text-landing-4xl">
              API-based developer portfolio, that converts.
            </h1>
            <p className="mt-6 text-landing-lg text-gray-600">
              Next-gen developer portfolio that helps you showcase your
              projects, skills, and experience. Personalize it by an evergrowing
              collection of building blocks and analyse your growth.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              {/* sign up button */}
              <Button href="/auth/login" target="_blank">
                Get started
              </Button>
              <Button
                href="https://getstage.app/caksono"
                target="_blank"
                variant="outline"
                external
              >
                <PlayIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5">See example</span>
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-top-10 lg:-bottom-20 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <PhoneFrameToggleScreen
                className="mx-auto max-w-[366px]"
                priority
              >
                <AppDemo />
              </PhoneFrameToggleScreen>
            </div>
          </div>
          <div className="relative mt-6 lg:col-span-7 lg:mt-0 xl:col-span-6">
            <p className="text-center text-landing-sm font-semibold text-gray-900 lg:text-left">
              Built with feedback from amazing engineers at
            </p>
            <ul
              role="list"
              className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
            >
              {[
                ["Uber", logoUber],
                ["Zillow", logoZillow],
                ["MaterialUI", logoMaterialUI],
                ["Google", logoGoogle],
                ["Freecodecamp", logoFreecodecamp],
                ["Drupal", logoDrupal],
                ["Golang", logoGo],
                ["OpenShift", logoOpenshift],
              ].map(([name, logo, className]) => (
                <li key={name} className={clsx("flex", className)}>
                  <Image
                    title={name}
                    src={logo}
                    alt={name}
                    sizes={100}
                    className="h-8 w-auto"
                    unoptimized
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
