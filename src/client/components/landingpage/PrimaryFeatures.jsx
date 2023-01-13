import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useDebouncedCallback } from 'use-debounce'

import { AppScreen } from './AppScreen'
import { Button } from './Button'
import { CircleBackground } from './CircleBackground'
import { Container } from './Container'
import { PhoneFrame } from './PhoneFrame'
import {
  GitHubLogo,
  LinkedInLogo,
  DEVLogo,
  TwitterLogo,
  MastodonLogo,
  LinearLogo,
  SpotifyLogo,
  GitLabLogo
} from './StockLogos'
import { Portfolio } from './Portfolio'

const MotionAppScreenHeader = motion(AppScreen.Header)
const MotionAppScreenBody = motion(AppScreen.Body)

const features = [
  {
    name: '1. Connect your content',
    description:
      'Connect your content to Stage. It’s as simple as clicking one button. Extend your content with our powerful extension API.',
    icon: DeviceArrowIcon,
    screen: PluginScreen,
  },
  {
    name: '2. Show your best work',
    description:
      'Showcase your best work with a beautiful portfolio that’s always in sync. Customize your site with a simple, intuitive interface.',
    icon: DeviceBeautifulIcon,
    screen: PortfolioScreen,
  },
  {
    name: '3. Analyse your growth',
    description:
      'Get a clear picture of your growth with detailed analytics. Understand your audience and make better decisions.',
    icon: DeviceChartIcon,
    screen: AnalyseScreen,
  },
]

function DeviceChartIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
        fill="#737373"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 13.838V26a2 2 0 01-2 2H11a2 2 0 01-2-2V15.65l2.57 3.212a1 1 0 001.38.175L15.4 17.2a1 1 0 011.494.353l1.841 3.681c.399.797 1.562.714 1.843-.13L23 13.837z"
        fill="#eeeeee"
      />
      <path
        d="M10 12h12"
        stroke="#737373"
        strokeWidth={2}
        strokeLinecap="square"
      />
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
    </svg>
  )
}

function DeviceBeautifulIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 138 138"
    >
      <path
        fill="#A3A3A3"
        fillOpacity="0.2"
        d="M69 138c38.108 0 69-30.892 69-69 0-38.108-30.892-69-69-69C30.892 0 0 30.892 0 69c0 38.108 30.892 69 69 69z"
      ></path>
      <path
        fill="#737373"
        fillRule="evenodd"
        d="M26.615 5.052A17.25 17.25 0 0138.813 0h60.374a17.25 17.25 0 0117.251 17.25V63h-8.626V17.25a8.623 8.623 0 00-8.624-8.625h-5.96a4.313 4.313 0 00-3.856 2.385l-1.932 3.855a4.312 4.312 0 01-3.855 2.385h-29.17a4.312 4.312 0 01-3.855-2.385l-1.932-3.855a4.313 4.313 0 00-3.856-2.385h-5.96a8.625 8.625 0 00-8.624 8.625v103.5a8.627 8.627 0 008.625 8.625H60V138H38.812a17.25 17.25 0 01-17.25-17.25V17.25a17.25 17.25 0 015.053-12.198z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#eeeeee"
        d="M135.673 93.297l-21.584-3.148-9.649-19.63a2.71 2.71 0 00-1.233-1.237 2.727 2.727 0 00-3.647 1.237l-9.648 19.63-21.585 3.148a2.711 2.711 0 00-1.555.793 2.74 2.74 0 00.05 3.865l15.617 15.279-3.69 21.576a2.734 2.734 0 001.081 2.67 2.71 2.71 0 002.864.205L102 127.498l19.306 10.187a2.698 2.698 0 001.726.273 2.726 2.726 0 002.219-3.148l-3.69-21.576 15.617-15.28c.425-.417.705-.963.79-1.56a2.718 2.718 0 00-2.295-3.097z"
      ></path>
    </svg>
  )
}

function DeviceArrowIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 138 138"
    >
      <path
        fill="#A3A3A3"
        fillOpacity="0.2"
        d="M69 138c38.108 0 69-30.892 69-69 0-38.108-30.892-69-69-69C30.892 0 0 30.892 0 69c0 38.108 30.892 69 69 69z"
      ></path>
      <path
        stroke="#eeeeee"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7.185"
        d="M90.305 67.356L62.014 39.065v15.717c-48.31 0-53.884 30.423-52.542 47.153 2.03-8.44 2.97-22.005 52.542-22.005v15.718l28.291-28.292z"
      ></path>
      <path
        fill="#737373"
        fillRule="evenodd"
        d="M26.615 5.052A17.25 17.25 0 0138.813 0h60.374a17.25 17.25 0 0117.251 17.25v103.5A17.251 17.251 0 0199.188 138H38.812a17.25 17.25 0 01-17.25-17.25V116h8.625v4.75a8.627 8.627 0 008.625 8.625h60.376a8.625 8.625 0 008.624-8.625V17.25a8.623 8.623 0 00-8.624-8.625h-5.96a4.313 4.313 0 00-3.856 2.385l-1.932 3.855a4.312 4.312 0 01-3.855 2.385h-29.17a4.312 4.312 0 01-3.855-2.385l-1.932-3.855a4.313 4.313 0 00-3.856-2.385h-5.96a8.625 8.625 0 00-8.624 8.625V32h-8.625V17.25a17.25 17.25 0 015.052-12.198z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

function CheckIcon() {
  return(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke="#06B6D4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.667 8l4 4 6.666-8"
      ></path>
    </svg>
  )
}

function Statistic(props) {
  return(
    <svg width="259" height="47" viewBox="0 0 259 47" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect y="14.7256" width="7.36306" height="32.2134" fill="#D9D9D9"/>
    <rect x="11.9648" y="11.0439" width="7.36306" height="35.8949" fill="#D9D9D9"/>
    <rect x="23.9297" y="11.0439" width="7.36306" height="35.8949" fill="#D9D9D9"/>
    <rect x="35.8945" y="24.8501" width="7.36306" height="22.0892" fill="#D9D9D9"/>
    <rect x="47.8594" y="35.8945" width="7.36306" height="11.0446" fill="#D9D9D9"/>
    <rect x="59.8247" y="11.0439" width="7.36306" height="35.8949" fill="#D9D9D9"/>
    <rect x="71.79" y="14.7256" width="7.36306" height="32.2134" fill="#D9D9D9"/>
    <rect x="83.7549" y="6.44238" width="7.36306" height="40.4968" fill="#D9D9D9"/>
    <rect x="95.7197" y="27.6108" width="7.36306" height="19.328" fill="#D9D9D9"/>
    <rect x="107.685" y="34.0542" width="7.36306" height="12.8854" fill="#D9D9D9"/>
    <rect x="119.649" y="34.0542" width="7.36306" height="12.8854" fill="#D9D9D9"/>
    <rect x="131.614" y="34.0542" width="7.36306" height="12.8854" fill="#D9D9D9"/>
    <rect x="143.58" y="23.0093" width="7.36306" height="23.93" fill="#D9D9D9"/>
    <rect x="155.544" y="27.6108" width="7.36306" height="19.328" fill="#D9D9D9"/>
    <rect x="167.509" y="27.6108" width="7.36306" height="19.328" fill="#D9D9D9"/>
    <rect x="179.474" y="8.2832" width="7.36306" height="38.6561" fill="#D9D9D9"/>
    <rect x="191.439" y="3.68115" width="7.36306" height="43.258" fill="#D9D9D9"/>
    <rect x="203.404" width="7.36306" height="46.9395" fill="#D9D9D9"/>
    <rect x="215.37" y="3.68115" width="7.36306" height="43.258" fill="#D9D9D9"/>
    <rect x="227.334" y="18.4072" width="7.36306" height="28.5319" fill="#D9D9D9"/>
    <rect x="239.299" y="6.44238" width="7.36306" height="40.4968" fill="#D9D9D9"/>
    <rect x="251.264" width="7.36306" height="46.9395" fill="black"/>
    </svg>
  )
}

function ReachGraph(props) {
  return(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="260"
      height="40"
      fill="none"
      viewBox="0 0 260 40"
    >
      <path fill="#fff" stroke="#fff" d="M0.5 25.5H259.5V35.5H0.5z"></path>
      <path fill="#000" d="M0 25H106V36H0z"></path>
      <path fill="#000" d="M107.411 20.914H110.172V39.322H107.411z"></path>
      <path
        stroke="#000"
        strokeDasharray="3 3"
        strokeWidth="2"
        d="M153 40V21"
      ></path>
      <path
        fill="#000"
        d="M152.322 2.375v14.25h1.187v-4.75h11.875v-9.5h-13.062zm1.187 1.188h1.782v1.78h1.781v-1.78h1.781v1.78h1.781v-1.78h1.782v1.78h1.781v1.782h-1.781v1.781h1.781v1.781h-1.781v-1.78h-1.782v1.78h-1.781v-1.78h-1.781v1.78h-1.781v-1.78h-1.782V7.124h1.782V5.344h-1.782V3.562zm1.782 3.562v1.781h1.781V7.125h-1.781zm1.781 0h1.781V5.344h-1.781v1.781zm1.781 0v1.781h1.781V7.125h-1.781zm1.781 0h1.782V5.344h-1.782v1.781zM173.04 10.58a2.623 2.623 0 01-.866-.151 1.962 1.962 0 01-.744-.48c-.22-.222-.394-.515-.523-.88-.127-.366-.19-.815-.19-1.347a4.84 4.84 0 01.167-1.31c.112-.386.271-.714.478-.983.208-.269.457-.474.747-.614a2.18 2.18 0 01.974-.213c.388 0 .731.076 1.029.228a1.894 1.894 0 011.045 1.477h-1.213a.81.81 0 00-.298-.477.902.902 0 00-.563-.174.948.948 0 00-.864.495c-.195.33-.294.777-.298 1.343h.04c.087-.172.204-.319.352-.44.15-.123.319-.217.509-.281.191-.067.393-.1.605-.1a1.74 1.74 0 011.557.91c.155.282.233.604.233.968 0 .394-.092.744-.276 1.051a1.916 1.916 0 01-.764.722 2.375 2.375 0 01-1.137.255zm-.005-.966a.957.957 0 00.861-.506 1.07 1.07 0 00.127-.523c0-.193-.042-.366-.127-.52a.945.945 0 00-.853-.503.978.978 0 00-.395.08.994.994 0 00-.525.551 1.022 1.022 0 00-.077.395 1.027 1.027 0 00.48.886c.15.093.319.14.509.14zm5.335 1.014c-.489-.002-.909-.122-1.261-.361-.351-.239-.621-.584-.81-1.037-.187-.453-.28-.997-.278-1.633 0-.635.093-1.176.281-1.623.189-.447.459-.787.81-1.02.352-.234.771-.352 1.258-.352s.905.118 1.256.353c.352.234.623.575.812 1.022.19.445.283.985.281 1.62 0 .638-.094 1.183-.284 1.636-.187.453-.456.798-.806 1.037-.351.239-.77.358-1.259.358zm0-1.02c.333 0 .599-.168.798-.503.199-.335.298-.838.296-1.508 0-.442-.046-.81-.137-1.103-.089-.293-.215-.514-.38-.662a.83.83 0 00-.577-.221c-.331 0-.597.166-.795.497-.199.331-.3.828-.302 1.489 0 .447.045.82.134 1.119.091.297.219.52.383.67a.841.841 0 00.58.222zm6.411-.199v-.307c0-.233.049-.447.148-.642.1-.197.245-.354.435-.471.191-.12.424-.18.698-.18.279 0 .513.06.702.177.191.117.335.274.432.471.099.195.148.41.148.645v.307c0 .233-.049.448-.148.645a1.142 1.142 0 01-.435.469c-.191.119-.424.179-.699.179a1.29 1.29 0 01-.701-.18 1.148 1.148 0 01-.432-.468 1.415 1.415 0 01-.148-.645zm.827-.307v.307c0 .135.032.261.097.38.066.12.185.18.357.18.173 0 .29-.059.353-.176a.788.788 0 00.096-.384v-.307a.836.836 0 00-.091-.386c-.06-.12-.179-.18-.358-.18-.17 0-.288.06-.355.18a.785.785 0 00-.099.386zm-3.813-3.022v-.307c0-.235.051-.45.151-.645.1-.197.245-.354.435-.472.191-.117.422-.176.693-.176.28 0 .515.059.704.176.19.118.334.275.432.472.099.195.148.41.148.645v.307c0 .234-.05.45-.151.644a1.147 1.147 0 01-.434.47c-.19.115-.423.172-.699.172-.277 0-.511-.058-.702-.176a1.187 1.187 0 01-.432-.468 1.435 1.435 0 01-.145-.642zm.833-.307v.307c0 .138.032.266.096.383.067.117.183.176.35.176.174 0 .292-.059.355-.176a.79.79 0 00.097-.383v-.307a.849.849 0 00-.091-.387c-.061-.119-.181-.179-.361-.179-.169 0-.285.061-.35.182a.81.81 0 00-.096.384zm-.458 4.727l4-5.818h.745l-4 5.818h-.745z"
      ></path>
    </svg>
  )
}

const headerAnimation = {
  initial: { opacity: 0, transition: { duration: 0.3 } },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const maxZIndex = 2147483647

const bodyVariantBackwards = {
  opacity: 0.4,
  scale: 0.8,
  zIndex: 0,
  filter: 'blur(4px)',
  // eslint-disable-next-line no-dupe-keys
  zIndex: 0,
  transition: { duration: 0.4 },
}

const bodyVariantForwards = (custom) => ({
  y: '100%',
  zIndex: maxZIndex - custom.changeCount,
  transition: { duration: 0.4 },
})

const bodyAnimation = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: {
    initial: (custom) =>
      custom.isForwards ? bodyVariantForwards(custom) : bodyVariantBackwards,
    animate: (custom) => ({
      y: '0%',
      opacity: 1,
      scale: 1,
      zIndex: maxZIndex / 2 - custom.changeCount,
      filter: 'blur(0px)',
      transition: { duration: 0.4 },
    }),
    exit: (custom) =>
      custom.isForwards ? bodyVariantBackwards : bodyVariantForwards(custom),
  },
}

function PluginScreen({ custom, animated = false }) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(animated ? headerAnimation : {})}>
        <AppScreen.Title>Extensions</AppScreen.Title>
        <AppScreen.Subtitle>
          Add content to your site with extensions
        </AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(animated ? { ...bodyAnimation, custom } : {})}>
      <div className="divide-y divide-gray-100">
          {[
            {
              name: 'GitHub',
              logo: GitHubLogo,
              connected: true,
            },
            {
              name: 'LinkedIn',
              logo: LinkedInLogo,
              connected: true,
            },
            {
              name: 'DEV',
              logo: DEVLogo,
              connected: true,
            },
            {
              name: 'Linear',
              logo: LinearLogo,
              connected: false,
            },
            {
              name: 'Spotify',
              logo: SpotifyLogo,
              connected: false,
            },
            {
              name: 'Mastodon',
              logo: MastodonLogo,
              connected: false,
            },
            {
              name: 'Twitter',
              logo: TwitterLogo,
              connected: false,
            },
            {
              name: 'GitLab',
              logo: GitLabLogo,
              connected: false,
            },
          ].map((stock) => (
            <div key={stock.name} className="flex items-center gap-4 px-4 py-[10px]">
              <div
                className="flex-none"
              >
                <stock.logo className="h-6 w-6" />
              </div>
              <div className="flex-auto text-landing-sm font-semibold text-gray-900">
                {stock.name}
              </div>
              <div className="flex-none text-right">
                <Button
                  className="px-3 py-1.5"
                  color={stock.connected ? 'lightcyan' : 'gray'}
                  variant={stock.connected ? 'solid' : 'outline'}
                >
                  {stock.connected && <CheckIcon />}
                  {stock.connected ? 'Done' : 'Connect'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 flex flex-row items-center justify-between p-4 h-20 w-full border-t-[1px] border-gray-100 bg-white/70 backdrop-blur">
          <span className="text-black font-bold text-landing-sm">
            Generate your portfolio
          </span>
          <Button color="cyan" className="px-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.56237 12.8906L17.2757 12.8906L9.06784 20.0156C8.93659 20.1305 9.01628 20.3438 9.18971 20.3438H11.2639C11.3553 20.3438 11.4421 20.3109 11.51 20.2523L20.3671 12.5672C20.4482 12.4969 20.5132 12.4099 20.5578 12.3123C20.6024 12.2146 20.6255 12.1085 20.6255 12.0012C20.6255 11.8938 20.6024 11.7877 20.5578 11.6901C20.5132 11.5924 20.4482 11.5055 20.3671 11.4352L11.4585 3.70312C11.4233 3.67266 11.3811 3.65625 11.3366 3.65625H9.19206C9.01862 3.65625 8.93893 3.87187 9.07018 3.98438L17.2757 11.1094L3.56237 11.1094C3.45925 11.1094 3.37487 11.1937 3.37487 11.2969V12.7031C3.37487 12.8063 3.45925 12.8906 3.56237 12.8906Z" fill="white"/>
            </svg>
          </Button>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function PortfolioScreen({ custom, animated = false }) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(animated ? headerAnimation : {})}>
        <AppScreen.Title>Portfolio</AppScreen.Title>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(animated ? { ...bodyAnimation, custom } : {})}>
        <Portfolio />
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function AnalyseScreen({ custom, animated = false }) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(animated ? headerAnimation : {})}>
        <AppScreen.Title>Analyse</AppScreen.Title>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(animated ? { ...bodyAnimation, custom } : {})}>
        <div className="p-4 space-y-4">
          {/* Stage views */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between mx-4 mb-4 pt-4">
              <span className="text-landing-sm font-bold">Stage views</span>
              <div className="flex">
                <span className="text-landing-xl font-bold">231</span>
                <span className="text-landing-xs font-medium ml-2 align-top text-cyan-400">+20%</span>
              </div>
            </div>
            <Statistic className="w-[100%-32px] mx-auto"/>
            <div className="divide-y divide-gray-200 mt-4 border-t-[1px] border-gray-200">
          {[
            {
              name: 'twitter.com',
              views: '130',
              change: '+10%',
            },
            {
              name: 'dev.to',
              views: '34',
              change: '+12%',
            },
            {
              name: 'github.com',
              views: '24',
              change: `${"+1%"+String.fromCharCode(160)}`,
            },
            {
              name: 'medium.com',
              views: '12',
              change: `${"-3%"+String.fromCharCode(160)}`,
            },
            // {
            //   name: 'spotify.com',
            //   views: '2',
            //   change: '+90%',
            // },
          ].map((stock) => (
            <div key={stock.name} className="flex items-center gap-4 px-4 py-3">
              <div className="flex-auto text-landing-sm font-medium text-gray-900">
                {stock.name}
              </div>
              <div className="flex text-right">
                <div className="text-landing-sm font-bold text-black">
                  {stock.views}
                </div>
                <div
                  className={clsx(
                    'text-landing-xs ml-2 align-top',
                    stock.change.startsWith('+')
                      ? 'text-cyan-500'
                      : 'text-red-500'
                  )}
                >
                  {stock.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 rounded-2xl pb-4">
        {/* Substainable reach */}
        <div className="flex items-center justify-between mx-4 mb-2 pt-4">
          <span className="text-landing-sm font-bold">Substainable reach</span>
          <div className="flex">
            <span className="text-landing-xl font-bold">34%</span>
          </div>
        </div>
        <ReachGraph className="w-[100%-32px] mx-auto" />
      </div>
      <div className="bg-gray-100 rounded-2xl">
        {/* New follower */}
        <div className="bg-gray-100 rounded-2xl">
            <div className="flex items-center justify-between mx-4 mb-4 pt-4">
              <span className="text-landing-sm font-bold">New follower</span>
              <div className="flex">
                <span className="text-landing-xl font-bold">28</span>
                <span className="text-landing-xs font-medium ml-2 align-top text-cyan-400">+5%</span>
              </div>
            </div>
            <div className="divide-y divide-gray-200 mt-4 border-t-[1px] border-gray-200">
          {[
            {
              name: 'twitter.com',
              views: '10',
              change: '+10%',
            },
            {
              name: 'dev.to',
              views: '3',
              change: '+12%',
            },
            {
              name: 'github.com',
              views: '24',
              change: '+1%',
            },
          ].map((stock) => (
            <div key={stock.name} className="flex items-center gap-4 px-4 py-3">
              <div className="flex-auto text-landing-sm font-medium text-gray-900">
                {stock.name}
              </div>
              <div className="flex text-right">
                <div className="text-landing-sm font-bold text-black">
                  {stock.views}
                </div>
                <div
                  className={clsx(
                    'text-landing-xs ml-2 align-top',
                    stock.change.startsWith('+')
                      ? 'text-cyan-500'
                      : 'text-red-500'
                  )}
                >
                  {stock.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function FeaturesDesktop() {
  let [changeCount, setChangeCount] = useState(0)
  let [selectedIndex, setSelectedIndex] = useState(0)
  let prevIndex = usePrevious(selectedIndex)
  let isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex

  let onChange = useDebouncedCallback(
    (selectedIndex) => {
      setSelectedIndex(selectedIndex)
      setChangeCount((changeCount) => changeCount + 1)
    },
    100,
    { leading: true }
  )

  return (
    <Tab.Group
      as="div"
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <Tab.List className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, featureIndex) => (
          <div
            key={feature.name}
            className="relative rounded-2xl transition-colors hover:bg-gray-800/30"
          >
            {featureIndex === selectedIndex && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-gray-800"
                initial={{ borderRadius: 16 }}
              />
            )}
            <div className="relative z-10 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 text-landing-lg font-semibold text-white">
                <Tab className="text-left [&:not(:focus-visible)]:focus:outline-none">
                  <span className="absolute inset-0 rounded-2xl" />
                  {feature.name}
                </Tab>
              </h3>
              <p className="mt-2 text-landing-sm text-gray-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </Tab.List>
      <div className="relative col-span-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground color="#13B5C8" className="animate-spin-slower" />
        </div>
        <PhoneFrame className="z-10 mx-auto w-full max-w-[366px]">
          <Tab.Panels as={Fragment}>
            <AnimatePresence
              initial={false}
              custom={{ isForwards, changeCount }}
            >
              {features.map((feature, featureIndex) =>
                selectedIndex === featureIndex ? (
                  <Tab.Panel
                    static
                    key={feature.name + changeCount}
                    className="col-start-1 row-start-1 flex focus:outline-offset-[32px] [&:not(:focus-visible)]:focus:outline-none"
                  >
                    <feature.screen
                      animated
                      custom={{ isForwards, changeCount }}
                    />
                  </Tab.Panel>
                ) : null
              )}
            </AnimatePresence>
          </Tab.Panels>
        </PhoneFrame>
      </div>
    </Tab.Group>
  )
}

function FeaturesMobile() {
  let [activeIndex, setActiveIndex] = useState(0)
  let slideContainerRef = useRef()
  let slideRefs = useRef([])

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(slideRefs.current.indexOf(entry.target))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      }
    )

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [slideContainerRef, slideRefs])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => (slideRefs.current[featureIndex] = ref)}
            className="w-full flex-none snap-center px-4 sm:px-6"
          >
            <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CircleBackground
                  color="#13B5C8"
                  className={featureIndex % 2 === 1 ? 'rotate-180' : undefined}
                />
              </div>
              <PhoneFrame className="relative mx-auto w-full max-w-[366px]">
                <feature.screen />
              </PhoneFrame>
              <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                <feature.icon className="h-8 w-8" />
                <h3 className="mt-6 text-landing-sm font-semibold text-white sm:text-landing-lg">
                  {feature.name}
                </h3>
                <p className="mt-2 text-landing-sm text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, featureIndex) => (
          <button
            type="button"
            key={featureIndex}
            className={clsx(
              'relative h-0.5 w-4 rounded-full',
              featureIndex === activeIndex ? 'bg-gray-300' : 'bg-gray-500'
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              slideRefs.current[featureIndex].scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              })
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
  )
}

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-gray-900 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-landing-3xl font-medium tracking-tight text-white">
            Stage was built for developers – by developers.
          </h2>
          <p className="mt-2 text-landing-lg text-gray-400">
            Developers don&apos;t wanna spend time updating 
            their website. With our 1-2-done workflow, we get you on
            stage asap. Additionally, you can extend 
            Stage to your needs with the ability to create your own extensions.
          </p>
        </div>
      </Container>
      <div className="mt-16 md:hidden">
        <FeaturesMobile />
      </div>
      <Container className="hidden md:mt-20 md:block">
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
