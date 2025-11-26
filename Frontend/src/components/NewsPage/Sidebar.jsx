import React, { useMemo } from 'react'
import { FaLink, FaFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from 'react-icons/ri';
import RelatedNewsCard from './RelatedNewsCard';

const Sidebar = ({author, date, related = []}) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = useMemo(() => encodeURIComponent(shareUrl), [shareUrl]);

  const socials = [
    {
      key: 'link',
      icon: <FaLink className='hover:cursor-pointer size-5 hover:text-brand transition-colors' />,
      href: shareUrl,
      label: 'Copy link',
      copy: true,
    },
    {
      key: 'facebook',
      icon: <FaFacebook className='hover:cursor-pointer size-5 hover:text-brand transition-colors' />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: 'Share on Facebook',
    },
    {
      key: 'instagram',
      icon: <RiInstagramFill className='hover:cursor-pointer size-5 hover:text-brand transition-colors' />,
      href: 'https://www.instagram.com',
      label: 'Instagram',
    },
    {
      key: 'x',
      icon: <FaSquareXTwitter className='hover:cursor-pointer size-5 hover:text-brand transition-colors' />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
      label: 'Share on X',
    },
  ];

  const handleShareClick = async (e, social) => {
    if (social.copy) {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch (err) {
        console.error('Failed to copy link', err);
      }
    }
  };

  return (
    <>
        <div className='w-[20%] mb-20 text-ink-primary'>
            <div className=''>
                <p className='font-thin text-ink-primary/60'>Published</p>
                <p className='font-bold'>{date || "15 January 2025 22:35 IST"}</p>
                <p className='mt-4 font-thin text-ink-primary/60'>Content</p>
                <p className='font-bold hover:cursor-pointer hover:text-brand'>{author || "Kevin Hendricks"}</p>
                <p className='mt-4 font-thin text-ink-primary/60'>Share</p>
                
                <div className='flex justify-between mt-1'>
                  {socials.map((social) => (
                    <a
                      key={social.key}
                      href={social.href}
                      target={social.copy ? undefined : "_blank"}
                      rel={social.copy ? undefined : "noreferrer"}
                      onClick={(e) => handleShareClick(e, social)}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
            </div>

            {related.length > 0 && (
              <div className='mt-14 font-grotesk'>
                  <p className='text-xl font-semibold'>Related News</p>
                  <div className='flex flex-col'>
                      {related.map((item) => (
                        <RelatedNewsCard key={item.id} item={item} />
                      ))}
                  </div>
              </div>
            )}
        </div>
    </>
  )
}

export default Sidebar
