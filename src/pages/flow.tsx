import Flow from 'components/Flow';
import SideNavBarLayout from 'layouts/SideNavBarLayout';
import { ReactElement } from 'react';

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
