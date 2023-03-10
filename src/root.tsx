// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import './root.css'

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Quicks</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="grid h-screen grid-cols-[17.8125rem_1fr] bg-primaryMineshaft">
        <aside class="border-r-2 border-white"></aside>
        <main class="grid grid-rows-[3.625rem_1fr]">
          <div class="grid grid-cols-[auto_1fr] items-center bg-primaryEmperor px-6">
            <img src="/assets/icons/search_24px_white.svg" alt="search icon" />
          </div>
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </main>
        <Scripts />
      </Body>
    </Html>
  );
}
