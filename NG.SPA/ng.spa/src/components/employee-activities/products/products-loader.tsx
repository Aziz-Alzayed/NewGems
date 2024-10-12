import { FC, useEffect } from "react";
import AuthenticatedComponent from "../../../auth/auth-wrappers/authenticated-user-components";
import ProductsStore from "stores/products-stores/products-store";
import { Spin } from "antd";
import { Outlet } from "react-router-dom";
import CommonPageTemplate from "../../helpers/common-page-template";

const ProductsLoader: FC = () => {
    const { products, loadProducts, productsLoading } = ProductsStore;

    useEffect(() => {
        if (!products.length) {
            loadProducts();
        }
    }, []);

    return (
        <CommonPageTemplate>
            <Spin tip="Loading products..." spinning={!products.length && productsLoading}>
                <Outlet />
            </Spin>
        </CommonPageTemplate>
    );
};

export default AuthenticatedComponent(ProductsLoader);