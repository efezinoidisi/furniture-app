import Image from 'next/image';
import React from 'react';

export default function AboutPage() {
  return (
    <main>
      <section>
        <div>
          <h1>our story</h1>
          <p>
            launched in 2023, IC is the number one online furniture shopping
            marketplace.
          </p>

          <p>
            IC has over a thousand products to offer, growing at a very fast
            pace.{' '}
          </p>
        </div>
      </section>

      <ul>
        <li>
          <Image src={'/assets/icons/hut.svg'} alt='' width={100} height={50} />
        </li>
      </ul>
    </main>
  );
}
