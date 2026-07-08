import Head from "next/head";
import GlassNavbar from "../components/layout/GlassNavbar";

export default function V2() {
  return (
    <>
      <Head>
        <title>Imperium Motors V2</title>
      </Head>

      <main>

        <GlassNavbar />

        <section
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#F8F7F3",
          }}
        >
          <h1>Imperium V2 Begins Here</h1>
        </section>

      </main>
    </>
  );
}