import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
import React from "react";

const BreadcrumbComponent = ({ items }) => {
    return (
        <Breadcrumb noTrailingSlash={true} className="bread-crumb-component">
            <BreadcrumbItem>
                <a href="/">Home</a>
            </BreadcrumbItem>

            {items && items.map((item,index) => {
               return <BreadcrumbItem key={index} as="a" href={`${item.url}`}>{item.name}</BreadcrumbItem>
            })}

        </Breadcrumb>
    )
}

export default BreadcrumbComponent;