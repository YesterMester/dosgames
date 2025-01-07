import RootLayout from '../components/layout';
import React from 'react';
import BreadcrumbComponent from '../components/bread-crumb/bread-crumb';
import { SEO as Seo } from '../components/seo';

const ProductPage = ({ pageContext, children }) => {
    const title = pageContext.frontmatter.title;
    const htmlContent = pageContext.htmlContent;
    const breads = [{ name: title, url: `/products/${pageContext.frontmatter.slug}` }];
    return (
        <RootLayout>
            <BreadcrumbComponent items={breads}></BreadcrumbComponent>
            <div className="product-page">
                <div className="product-page-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
        </RootLayout>
    )
};

export default ProductPage;

export const Head = ({ data, pageContext }) => {
    return (
        <>
            <Seo seo_title={pageContext.title} />
        </>
    );
}