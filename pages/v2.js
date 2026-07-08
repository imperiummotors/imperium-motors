import Head from "next/head";
import GlassNavbar from "../components/layout/GlassNavbar";
import Hero from "../components/hero/Hero";

export default function V2() {
  return (
    <>
      <Head>
        <title>Imperium Motors V2</title>
      </Head>

      <GlassNavbar />

      <Hero />
    </>
  );
}