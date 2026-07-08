import Head from "next/head";
import GlassNavbar from "../components/layout/GlassNavbar";

export default function V2() {
  return (
    <>
      <Head>
        <title>Imperium Motors V2</title>
      </Head>

      <GlassNavbar />

      <main>

        <section
          style={{
            height: "100vh",
            paddingTop: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            background: "#F8F7F3"
          }}
        >

          <h1
            style={{
              fontSize: "64px",
              fontFamily: "Cormorant Garamond",
              fontWeight: 600,
              color: "#181818"
            }}
          >
            Imperium V2 Begins Here
          </h1>

        </section>

      </main>
    </>
  );
}