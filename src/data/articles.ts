export type ArticleSection = { heading?: string; body: string[] }

export type ArticleContent = {
  title: string
  lead?: string
  sections: ArticleSection[]
}

export const articles: Record<string, ArticleContent> = {
  about: {
    title: 'About This Website',
    sections: [
      {
        heading: 'Copyright',
        body: [
          'This website is owned and operated by Cygames, Inc. (hereinafter referred to as “Cygames”). All rights reserved. Except where permitted by law, no part of this website may be republished, reproduced, altered, publicly transmitted, translated, sold, or otherwise used without the prior consent of Cygames.',
        ],
      },
      {
        heading: 'Disclaimer',
        body: [
          'Cygames cannot guarantee the accuracy and completeness of the information contained on this website. We will not be liable for any potential damage or losses incurred as a result of using this website. Additionally, we are not responsible for any actions taken or services provided by third parties on this website.',
        ],
      },
      {
        heading: 'Linking',
        body: [
          'Linking to this website is generally allowed. However, links from websites that feature content libelous towards Cygames, websites that violate or are likely to violate intellectual property rights, or websites that create the misconception that Cygames supports or acknowledges the linking website are prohibited. Third-party websites that link to our website are not within our control, and Cygames is not liable for any damage or losses which may occur as a result of using them.',
        ],
      },
    ],
  },
  devices: {
    title: 'Recommended Devices',
    lead: 'Umamusume: Pretty Derby is available on iOS, Android, and PC. For the best experience, use a device that meets the recommended requirements below.',
    sections: [
      { heading: 'iOS', body: ['iOS 13.0 or later', 'iPhone 8 or later', 'iPad mini 5 or later'] },
      { heading: 'Android', body: ['Android 8.0 or later', '4 GB RAM or more', '64-bit processor'] },
      { heading: 'PC (Windows)', body: ['Windows 10 64-bit', 'Intel Core i3-6100 or equivalent', '4 GB RAM', 'DirectX 11 compatible GPU'] },
    ],
  },
  policy: {
    title: 'Privacy Policy',
    lead: 'Original Effective Date: June 24, 2024　Last Updated: June 24, 2025',
    sections: [
      { body: ['Cygames, Inc., as well as its subsidiaries and affiliated entities (“Cygames,” “we,” or “us”), takes the protection of your personal data very seriously. The following privacy policy will provide you with information about personal data that we collect and how it is processed and used.'] },
      { body: ['PLEASE READ THIS PRIVACY POLICY CAREFULLY BECAUSE, BY USING THE SERVICES, YOU CONSENT TO THE TERMS AND CONDITIONS OF THIS PRIVACY POLICY AND TO OUR PROCESSING OF PERSONAL DATA FOR THE PURPOSES STATED BELOW. IF YOU DO NOT AGREE WITH THE TERMS AND CONDITIONS OF THIS PRIVACY POLICY, PLEASE DO NOT USE THE SERVICES.'] },
      { heading: '1. Scope of This Privacy Policy', body: ['This Privacy Policy applies only to services related to “Umamusume: Pretty Derby” controlled by Cygames (the “Services”).'] },
      { heading: '2. Personal Data Collected', body: ['We may collect your name, address, email address, social media accounts, IP address, cookies, other online identifiers, behavioral data, date of birth, telephone number, device information, location, log information, platform account information, inquiry contents, inferences drawn from personal data, and other personal data required to provide the Services.'] },
      { heading: '3. Cookies', body: ['We use cookies in the Services. Cookies are small text files that websites send to your device for the purpose of keeping records. You can choose whether to allow us or third parties to set cookies which are not strictly necessary for the functioning of our website via the cookie banner and settings.'] },
      { heading: '4. Use of Tracking and Similar Tools Provided by Third Parties', body: ['We engage in targeted advertising and use advertisers to serve advertisements on and off our Services. We also use Google Analytics, Google Analytics for Firebase, Firebase Crashlytics, Adjust, and Datadog.'] },
      { heading: '5. Your Choice regarding Online Tracking', body: ['Our online services are not designed to respond to “Do Not Track” requests from browsers. However, you may communicate your privacy preference via the Global Privacy Control opt-out preference signal.'] },
      { heading: '6. Use of Personal Data', body: ['We may process your personal data to deliver content, develop services, respond to inquiries, provide offers and campaign information, complete transactions, improve the Services, and resolve disputes.'] },
      { heading: '7. Disclosure to Third Parties', body: ['We may share or disclose personal data to service providers, cloud providers such as AWS, Zendesk and Akamai, social media providers, and when required by law or corporate reorganization.'] },
      { heading: '8. Security', body: ['No data transmissions over the Internet can be guaranteed to be 100% secure. Cygames specifies rules for the protection of personal data and incorporates appropriate administrative, technical, organizational, and physical security measures.'] },
      { heading: 'Addendum for Residents of California', body: ['If you are a California resident, you may have the right to know, delete, or correct personal information collected about you, and to opt out of the sale or sharing of personal information. You may exercise these rights through the “Your Privacy Choices” link in the footer.'] },
    ],
  },
  'privacy-choices': {
    title: 'Your Privacy Choices',
    lead: 'You can control how your personal information is used by Cygames and our partners.',
    sections: [
      { body: ['Where required by applicable law, you may opt out of the sale or sharing of personal information, limit the use of sensitive personal information, and manage cookie preferences. Depending on your region, these choices may be presented through our consent management banner or a Global Privacy Control signal.'] },
      { body: ['You can also manage cookies directly in your browser settings. Blocking cookies may prevent you from taking advantage of some personalized features of the Services.'] },
    ],
  },
  terms: {
    title: 'Terms of Use & Copyrights',
    sections: [
      { heading: 'Terms of Use', body: ['By using this website, you agree to comply with these terms. You may use this website for lawful, personal, and non-commercial purposes only. You may not use this website in any way that infringes the rights of Cygames, other users, or third parties.'] },
      { heading: 'Copyrights', body: ['All copyrights and other rights related to the content of this website belong to Cygames, Inc. or its licensors. Reproduction, redistribution, modification, or public transmission of any content without permission is prohibited.'] },
      { heading: 'Trademarks', body: ['“Umamusume: Pretty Derby,” the Umamusume logo, and all related characters and logos are trademarks or registered trademarks of Cygames, Inc.'] },
    ],
  },
  'fan-createdguide': {
    title: 'Fan-Created Content Guidelines',
    lead: 'Umamusume: Pretty Derby Fan-Created Content Guidelines — Please refer to the below guidelines when creating artistic works related to Umamusume: Pretty Derby.',
    sections: [
      { body: ['Many of the characters found in Umamusume: Pretty Derby are based on real-life racehorses from horse racing history, and their names are borrowed with the permission of their respective owners. It is thanks to the cooperation of these owners, the horses’ fans, and many others that we have been able to bring each Umamusume to life.'] },
      { heading: 'Please avoid works that:', body: [
        'Are made with the intent to injure the reputation of this franchise or other third parties.',
        'Are of a violent, sexual, or otherwise obscene nature.',
        'Advocate or criticize political views, religion, or ideology, or use derivative works for these purposes.',
        'Involve illegal activities or other inappropriate conduct.',
        'Infringe upon the rights of a third party.',
        'Are intended for commercial use or profit beyond the scope of fan-related activities.',
        'Might otherwise be deemed inappropriate when taken in the context of this list.',
      ] },
      { body: ['The above guidelines were created in cooperation with the agencies that manage the registration of the real-life racehorses’ names. Whether the content in question violates the above criteria will be up to the discretion of Cygames, Inc. Please be aware that Cygames, Inc. may pursue legal action if necessary.'] },
      { body: ['These guidelines are not intended to discourage fan-created content or fan activities. We hope for your understanding and cooperation with upholding an environment that is fun and enjoyable for everyone. With your cooperation, the Umamusume Project will continue to support real-life racehorses and honor their legacies.'] },
    ],
  },
  'visitingstables-guidelines': {
    title: 'Guidelines for Visiting Stables in Japan',
    lead: 'Many of the real-life racehorses featured in Umamusume: Pretty Derby can be seen at training facilities and stables in Japan.',
    sections: [
      { heading: 'General Etiquette', body: ['Follow all instructions given by stable staff. Do not enter restricted areas, feed horses without permission, or use flash photography. Keep noise to a minimum and do not disturb the horses or other visitors.'] },
      { heading: 'Respect the Horses and Staff', body: ['Observe from a safe distance. Never touch a horse unless expressly invited by a handler. Be considerate of the horses’ rest and training schedules.'] },
      { heading: 'Photography', body: ['Photography may be restricted in some areas. Check with staff before taking photos or videos, and avoid posting content that could cause discomfort to the owners, trainers, or fans of the real-life horses.'] },
    ],
  },
}
