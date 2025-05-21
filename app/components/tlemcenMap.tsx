import Image from 'next/image';

const TlemcenMap = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const latitude = 34.9011;
  const longitude = -1.3167;
  const zoom = 13;
  const size = '600x400';
  const marker = `${latitude},${longitude}|red`;

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${size}&markers=${marker}&key=${apiKey}`;

  if (!apiKey) {
    console.error("Google Maps API key is not configured. Please check your .env.local and next.config.ts.");
    return <div>Error: Google Maps API key not configured.</div>;
  }

  return (
    <div>
      <Image
        src={staticMapUrl}
        alt="Static map of Tlemcen, Algeria"
        width={600}
        height={400}
        onError={(e) => {
          console.error("Error loading Google Static Map:", e);
        }}
      />
    </div>
  );
};

export default TlemcenMap;