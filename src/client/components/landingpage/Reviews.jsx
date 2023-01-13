import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import {
  motion,
  useAnimationFrame,
  // useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

import { Container } from './Container'

const reviews = [
  {
    title: '',
    body: `It is really interesting and amazing man. I signed up for the access.

    Let me know if I can help you in this project.
    
    Amazing project 🔥🔥🔥`,
    author: 'Ritik Chourasiya',
    link: 'https://twitter.com/theritikchoure/status/1611383520647315458'
  },
  {
    title: '',
    body: `Great 🔥
    
    Very handy and anyone can build portfolio quickly`,
    author: 'Mr. Ånand',
    link: 'https://twitter.com/Astrodevil_/status/1611367127713476608'
  },
  {
    title: '',
    body: 'Looks great! I’ll have to check it out when you guys launch.',
    author: 'Charles Miller',
    link: 'https://twitter.com/millersWebDev/status/1597967770481700864'
  },
  {
    title: '',
    body: 'Looks good. Excited to see a release 👍🏻',
    author: 'Samuel A. Fishback',
    link: 'https://twitter.com/samuelfishback/status/1593839083335610368'
  },
  {
    title: '',
    body: `Well Done Stage is an Exceptional App i've dropped my email to get early access`,
    author: 'Mr. Grade',
    link: 'https://twitter.com/MrGrade3/status/1611045755393015808'
  },
  {
    title: '',
    body: `⚡️Guys checkout https://getstage.app  Why spend hours building a portfolio website from scratch when you can use Stage? The API-based platform connects to your social media, LinkedIn, and more to create a beautiful and always up-to-date site. [...]`,
    author: 'Frontend React Developer',
    link: 'https://twitter.com/developedbyjsx/status/1611018652731555840'
  },
  {
    title: '',
    body: `Looks like it could be a killer tool for devs! I just signed up for early access; I can't wait to check it out :)`,
    author: 'Tawnya Wessar',
    link: 'https://twitter.com/TacoBoutCode/status/1598736599113953281'
  },
  {
    title: '',
    body: 'Amazing.. waiting for it to launch 🚀',
    author: 'Krish Chopra',
    link: 'https://twitter.com/krishchopra22/status/1596871767469228033'
  },
  // {
  //   title: '',
  //   body: 'Woah this is amazing ⚡',
  //   author: 'Ashish Thomas',
  //   link: 'https://twitter.com/ashishthomas6/status/1595998056163385345'
  // },
  // {
  //   title: '',
  //   body: `Original idea 💡
  //   Congrats!`,
  //   author: 'Alex Mano',
  //   link: 'https://twitter.com/AlexMano12/status/1594805930754973702'
  // },
  {
    title: '',
    body: 'Love the idea of how it’ll always be up to date pulling data from these sources. Gonna check this out 👀',
    author: 'Ting',
    link: 'https://twitter.com/this_ting/status/1592830303672107009'
  }
]

function Review({ title, body, author, link, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <a rel="noreferrer" target="_blank" href={link} 
      className={clsx( 'animate-fade-in opacity-0 block', className)}
    >
      <figure
      className={clsx(
      'rounded-3xl bg-white p-6 shadow-md shadow-gray-900/5',
      className
      )}
      style={{ animationDelay }}
      {...props}
      >
          <blockquote className="text-gray-900">
            {/* <p className="mt-4 text-landing-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
              {title}
            </p> */}
            <p className="text-landing-base leading-7">{body}</p>
          </blockquote>
        <figcaption className="mt-3 text-landing-sm text-gray-600 before:content-['–_']">
          {author}
        </figcaption>
      </figure>
    </a>
  )
}

function splitArray(array, numParts) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function ReviewColumn({
  className,
  reviews,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reviewClassName = () => {},
  msPerPixel = 0,
}) {
  let columnRef = useRef()
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current.offsetHeight)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration }}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  )
}

function ReviewGrid({ review }) {
  console.log(review)
  let containerRef = useRef()
  // let isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let isInView = true
  let columns = splitArray(reviews, 3)
  columns = [columns[0], columns[1], splitArray(columns[2], 2)]

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[130vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:max-h-[32rem] lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...columns[0], ...columns[2].flat(), ...columns[1]]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= columns[0].length + columns[2][0].length &&
                  'md:hidden',
                reviewIndex >= columns[0].length && 'lg:hidden'
              )
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={[...columns[1], ...columns[2][1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= columns[1].length && 'lg:hidden'
            }
            msPerPixel={20}
          />
          <ReviewColumn
            reviews={columns[2].flat()}
            className="hidden lg:block"
            msPerPixel={15}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  )
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pt-20 pb-16 sm:pt-32 sm:pb-24"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-landing-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          Community voices
        </h2>
        <p className="mt-2 text-landing-lg text-gray-600 sm:text-center">
          What people are saying about the Stage
        </p>
        <ReviewGrid />
      </Container>
    </section>
  )
}
