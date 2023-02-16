import CommerceSDK from '@chec/commerce.js';

const commerce = new CommerceSDK(process.env.NEXT_PUBLIC_API_KEY);

export default commerce;