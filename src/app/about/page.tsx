/* eslint-disable react/no-unescaped-entities */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
type Props = {};

export default function Page({}: Props) {
  return (
    <section className="max-w-[75ch] min-h-screen text-lg m-auto p-4 [&>div>p]:xl:text-xl">
      <div>
        <h1 className="text-center text-2xl mb-10 2xl:text-4xl">
          MenuBuddy AI
        </h1>
        <span className="text-base xl:text-lg">
          MenuBuddy AI aims to lower the <strong>Anxiety</strong> that the
          GenZ's face while dinning out in a restaurant. It does this by
          recommending a dish after analysing an image of a restaurant menu
          while considering dietary preferences of the user.
        </span>
      </div>
      <div className="mt-5">
        <span className="text-base xl:text-lg">
          84% GenZ's suffer from anxiety while sitting in a restaurant. One
          reason, including several others, is that they are too confused on
          what to order. They are unable to take a decision, due to anxiety and
          the overwhelming restaurant menu. This was a big news a while back.
          Major news and media publishing companies published their headlines
          for it. Read below:
        </span>
        <div className="flex flex-col text-base mt-5 gap-2 [&>div>em]:xl:text-lg [&>div]:my-2">
          <div className="flex flex-col">
            <a
              className="w-fit font-medium italic"
              href="https://nypost.com/2023/12/21/lifestyle/gen-zs-menu-anxiety-is-totally-understandable/"
            >
              New York Post
            </a>
            <em>
              "Tomato ovaries, dumb categories and insane prices: No wonder Gen
              Z suffers from ‘menu anxiety’."
            </em>
          </div>
          <div className="flex flex-col">
            <a
              className="w-fit font-medium italic"
              href="https://news.yahoo.com/menu-anxiety-gen-z-apparently-220606653.html"
            >
              Yahoo news
            </a>
            <em>
              "What’s Menu Anxiety? Gen Z Is Apparently Suffering From The
              Phenomenon."
            </em>
          </div>
          <div className="flex flex-col">
            <a
              className="w-fit font-medium italic"
              href="https://www.businessinsider.in/retail/news/gen-zers-are-suffering-from-menu-anxiety-and-some-are-scared-to-order-their-own-food-at-restaurants-new-survey-finds/articleshow/106031845.cms"
            >
              Business Insider India
            </a>
            <em>
              "Gen Zers are suffering from 'menu anxiety,' and some are scared
              to order their own food at restaurants, new survey finds."
            </em>
          </div>
          <p>And many more...</p>
        </div>
        <div className="mt-10">
          <h1 className="text-2xl mb-5 2xl:text-4xl">FAQ</h1>
          <Accordion
            type="single"
            collapsible
            className="mb-20"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-fraunces 2xl:text-xl">
                I don't see an option to take a picture!?
              </AccordionTrigger>
              <AccordionContent>
                Please make sure you have enabled camera access permission for
                the browser. <strong>Samsung</strong> users may not see an
                option because of the restrictions in the OS. If you are a
                samsung user, please click a picture of a menu separately using
                in-built camera and then select it in the web app.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-fraunces 2xl:text-xl">
                The recommended dishes are wrong!
              </AccordionTrigger>
              <AccordionContent>
                Thank you for your understanding! Currently, we are in the
                private beta stage, and the AI used for dish recommendations is
                not yet polished for production use. We appreciate your
                patience, and in future releases, improvements are expected.
                Kindly ensure to provide only the picture of the menu.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-fraunces 2xl:text-xl">
                All of my requests are exhausted! What to do now?
              </AccordionTrigger>
              <AccordionContent>
                Firstly, thanks for being our user. We appreciate it. Because
                the app is still in beta, we can only give each user a total of
                5 requests. If you have exhausted all your requests, you can
                request me to increase it by contacting me on my twitter{" "}
                <a
                  className="underline"
                  href="https://twitter.com/bitnagar"
                >
                  @bitnagar
                </a>
                .
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
