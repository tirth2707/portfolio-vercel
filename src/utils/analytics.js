// Analytics utility functions
// Replace GA_MEASUREMENT_ID with your actual Google Analytics ID

export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

export const trackSectionView = (sectionName) => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
};
