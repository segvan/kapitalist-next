import Image from "next/image";

export default async function Loading() {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
            <Image src="/logo192.png" alt="" width={64} height={64}/>
        </div>
      </div>
    </section>
  );
}
