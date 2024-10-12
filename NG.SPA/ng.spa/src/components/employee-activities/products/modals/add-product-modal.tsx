import { PlusOutlined } from "@ant-design/icons";
import { Button, GetProp, Image, Modal, Upload, UploadFile, UploadProps, message, Form, Input, Select } from "antd"
import { useState } from "react";
import { ProductCategoryTypes } from "../../../../models/employee-activities-models/employee-activities-model";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface IAddProductModalProps {
    visible: boolean;
    onClose: () => void;
}

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const AddProductModal: React.FC<IAddProductModalProps> = ({ visible, onClose}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile<File>[]>([]);
    const [form] = Form.useForm(); 


    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        // Filter files based on size
        const filteredFileList = newFileList.filter(file => {
            if (file.size && file.size > 2 * 1024 * 1024) {
                message.error(`${file.name} is larger than 2MB.`);
                return false;
            }
            return true;
        });

        // Update fileList
        setFileList(filteredFileList);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const onFinish = (values: any) => {
        // Perform submission logic here, e.g., API call to save the product data
        console.log('Received values:', values);
        onClose();
    };
    return (
        <Modal
            open={visible}
            title="Upload Images"
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" >
                    Upload
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="images"
                    label="Images"
                    rules={[{ required: true, message: 'Please upload at least one image' }]}
                >
            <Upload
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
                    <p>Maximum 4 images, 2MB each (Total size not exceed 8MB)</p>
                </Form.Item>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please enter the title' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="descriptions"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter the description' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="body"
                    label="Body"
                    rules={[{ required: true, message: 'Please enter the body' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: 'Please select the category' }]}
                >
                    <Select>
                        {Object.values(ProductCategoryTypes).map(category => (
                            <Select.Option key={category} value={category}>{category}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );

};