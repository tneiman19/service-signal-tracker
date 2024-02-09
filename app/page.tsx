import Image from "next/image";
export default function Home() {
  return (
    <>
      <h1>Service Signal</h1>
      <h2>Coming Soon...</h2>

      <div className="flex justify-center items-center h-screen">
        <div className="flex max-w-full max-h-full rounded-lg overflow-hidden">
          <p>
            Service Signal: Your Comprehensive Asset Tracking Solution.
            Streamline your operations and gain full control over your assets
            with Service Signal. From tracking entities and properties to
            managing service tickets and more, our cutting-edge technology
            simplifies asset management. Experience efficiency and insights like
            never before.
          </p>
          <Image
            src="/SampleServiceSignalImage.png"
            alt="Description of the image"
            width={200}
            height={200}
            layout="responsive"
          />
        </div>
      </div>
    </>
  );
}
