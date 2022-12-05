import Flow from '@components/flow';
import { GetStaticProps } from "next";
import { getTranslation } from "../util/i18n";

export const getStaticProps: GetStaticProps = async function getStaticProps({ locale }) {
    const translations = await getTranslation(locale, ['common', 'nav']);
    return {
        props: {
            ...translations,
        }
    }
}

export default function FlowPage() {
    return (
        <div style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
        }}>
            <h1>Flow page</h1>
            <Flow />
        </div>
    );
}
