import Image from 'next/image';
import DefaultButton from '../buttons/default-button';
import NavLinks from '../navigation/nav-links';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='text-grey-100 page-size flex flex-col place-content-center min-h-72 gap-y-10 py-10  mt-5 md:py-16'>
      <div className='grid md:grid-cols-4 gap-x-10 gap-y-3'>
        <div className='flex flex-col-reverse md:flex-col col-span-2'>
          <Image
            src={'/assets/images/logo.svg'}
            alt='logo'
            width={40}
            height={40}
            className='w-9'
          />

          <form className='flex flex-col gap-2'>
            <p className='mb-7 mt-3 text-center md:text-left'>
              Join our newsletter to stay up to date on features and releases.
            </p>
            <div className='flex gap-2 lg:gap-4 bg-white p-1'>
              <input
                type='email'
                name='subscribe'
                id='subscribe'
                placeholder='enter your email'
                className='p-3 bg-transparent outline-none w-full placeholder:capitalize'
              />
              <DefaultButton
                type='submit'
                className='px-5 py-1 lg:py-2  rounded-md border-grey-300 border capitalize text-sm bg-background'
              >
                subscribe
              </DefaultButton>
            </div>
            <p className='leading-5 text-xs text-balance mt-2 mb-3'>
              By subscribing you agree with our Privacy Policy and provide
              consent to receive updates from our company.
            </p>
          </form>
        </div>
        <div className='flex justify-between col-span-2 w-full '>
          <div className='col-span-1'>
            <h5 className='capitalize font-bold text-black mb-3 text-xs text-nowrap md:text-sm'>
              about us
            </h5>
            <NavLinks
              navigationLinks={footerData.aboutUs}
              className='flex flex-col gap-y-3'
              linkStyle='capitalize text-xs'
            />
          </div>
          <div className='col-span-1'>
            <h5 className='capitalize font-bold text-black mb-3 text-nowrap md:text-sm text-xs'>
              customer support
            </h5>
            <NavLinks
              navigationLinks={footerData.customerSupport}
              className='flex flex-col gap-y-3'
              linkStyle='capitalize text-xs'
            />
          </div>
          <div className='col-span-1'>
            <h5 className='capitalize font-bold text-black mb-3 text-xs text-nowrap md:text-sm'>
              follow us
            </h5>
            <NavLinks
              navigationLinks={footerData.followUs}
              className='flex flex-col gap-y-3'
              linkStyle='capitalize text-xs'
            />
          </div>
        </div>
      </div>
      <div className='flex lg:justify-between lg:flex-row flex-col items-center lg:items-start gap-2 text-[0.6rem] lg:text-xs'>
        <p>© {year} ZFurniture. All rights reserved.</p>
        <div>
          <NavLinks
            navigationLinks={footerData.bottomLinks}
            className='flex gap-5'
            linkStyle='capitalize'
          />
        </div>
      </div>
    </footer>
  );
}

const footerData = {
  aboutUs: [
    {
      path: '',
      title: 'FAQ',
    },
    {
      path: '',
      title: 'contact',
    },
    {
      path: '',
      title: 'returns',
    },
    {
      path: '',
      title: 'blog',
    },
    {
      path: '',
      title: 'shipping',
    },
  ],

  customerSupport: [
    {
      path: '',
      title: 'affilates',
    },
    {
      path: '',
      title: 'apple pay payments',
    },
    {
      path: '',
      title: 'returns policy',
    },
  ],

  followUs: [
    {
      icons: '',
      title: 'facebook',
      path: '',
    },
    {
      icons: '',
      title: 'instagram',
      path: '',
    },
    {
      icons: '',
      title: 'twitter/x',
      path: '',
    },
    {
      icons: '',
      title: 'linkedIn',
      path: '',
    },
  ],

  bottomLinks: [
    {
      path: '',
      title: 'privacy policy',
    },
    {
      path: '',
      title: 'terms of service',
    },
    {
      path: '',
      title: 'cookies settings',
    },
  ],
};
