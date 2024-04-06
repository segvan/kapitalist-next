import Image from "next/image";

export default async function Loading() {
  return (
    <div className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-6 is-offset-3 is-desktop">
            <Image src="/logo192.png" alt="" width={64} height={64}/>
          </div>
        </div>
      </div>
    </div>
  );
}
