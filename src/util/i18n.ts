
// import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getTranslation = async (locale: string | undefined, dependencies: string[]) => {
    if (!locale) return;

    // if (process.env.NODE_ENV === "development") {
    //     await i18n?.reloadResources();
    // }
    return await serverSideTranslations(locale!, dependencies)
}