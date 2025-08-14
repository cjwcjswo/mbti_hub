import { useEffect } from 'react';

interface AdBannerProps {
  position: 'header' | 'sidebar' | 'footer' | 'content'
}

const AdBanner = ({ position }: AdBannerProps) => {
  useEffect(() => {
    // Google AdSense 광고 로드
    if ((window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  // 실제 광고 설정에 따라 조건부 렌더링
  const showAds = import.meta.env.MODE === 'production' && import.meta.env.VITE_ADS_ENABLED === 'true';

  const getAdClasses = () => {
    const baseClasses = "w-full bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center";
    const heightClasses = position === 'header' || position === 'footer'
      ? "min-h-[90px] md:min-h-[90px]"
      : "min-h-[250px] md:min-h-[250px]";
    const marginClasses = position === 'header'
      ? "mb-4"
      : "my-4";

    return `${baseClasses} ${heightClasses} ${marginClasses}`;
  };

  if (!showAds) {
    return (
      <div className={getAdClasses()}>
        <div className="text-gray-500 text-sm text-center">
          {position === 'header' && '헤더 광고 영역'}
          {position === 'footer' && '푸터 광고 영역'}
          {position === 'content' && '콘텐츠 광고 영역'}
          {position === 'sidebar' && '사이드바 광고 영역'}
        </div>
      </div>
    );
  }

  return (
    <div className={getAdClasses()}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
        data-ad-slot={getAdSlot(position)}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

const getAdSlot = (position: string): string => {
  // 실제 AdSense 광고 슬롯 ID로 교체
  const adSlots: { [key: string]: string } = {
    header: '1234567890',
    footer: '0987654321',
    content: '1122334455',
    sidebar: '5566778899'
  };

  return adSlots[position] || '1234567890';
};

export default AdBanner;
