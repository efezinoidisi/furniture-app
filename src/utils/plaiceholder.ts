'use server';
import { getPlaiceholder } from 'plaiceholder';

export default async function getPlaceholder(photo: string) {
  try {
    const buffer = await fetch(photo).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );
    const { ...plaiceholder } = await getPlaiceholder(buffer);
    return { ...plaiceholder };
  } catch (error) {
    console.log(error);
    return null;
  }
}
