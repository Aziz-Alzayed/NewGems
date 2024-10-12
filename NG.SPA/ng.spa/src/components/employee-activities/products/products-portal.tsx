import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { FC, useState } from "react"
import CommonPageTemplate from "../../helpers/common-page-template";
import { AddProductModal } from "./modals/add-product-modal";

export const ProductsPortal: FC = () => {
    const [isOpenAddProductModal, setIsOpenAddProductModal] = useState<boolean>(false);

    return (
        <CommonPageTemplate>
            <Button
                type="primary"
                style={{ marginBottom: 16 }}
                icon={<PlusCircleOutlined />}
                onClick={() => { setIsOpenAddProductModal(true) } }
            >
                Add Product
            </Button>
            <Table />
            <AddProductModal visible={isOpenAddProductModal} onClose={() => { setIsOpenAddProductModal(false) }} />
        </CommonPageTemplate>
    );
};

