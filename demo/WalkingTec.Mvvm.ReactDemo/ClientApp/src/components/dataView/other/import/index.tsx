/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2019-02-24 17:06:25
 * @modify date 2019-02-24 17:06:25
 * @desc [description]
 */
import { Button, Divider, Icon, Modal, Upload, message } from 'antd';
import { DesError } from 'components/decorators';
import { observer } from 'mobx-react';
import * as React from 'react';
import Store from 'store/dataSource';
import RequestFiles from 'utils/RequestFiles';
/**
 * 导入导出
 */
@DesError
@observer
export class ImportModal extends React.Component<{ Store: Store }, any> {
    Store = this.props.Store;
    success = false;
    onTemplate() {
        this.Store.onTemplate()
    }
    onCancel() {
        const { PageState } = this.Store;
        PageState.visiblePort = false
    }
    async onImport(id) {
        // 导入
        const res = await this.props.Store.onImport(id);
        if (res) {
            this.Store.onSearch();
            this.onCancel();
            // this.success = true;
        }
    }
    render() {
        const DraggerProps = {
            name: 'file',
            // multiple: true,
            showUploadList: false,
            accept: ".xlsx,.xls",
            action: RequestFiles.FileTarget,
            onChange: info => {
                const status = info.file.status
                if (status !== 'uploading') {
                }
                if (status === 'done') {
                    const response = info.file.response
                    if (typeof response.Id === "string") {
                        this.onImport(response.Id)
                    } else {
                        message.error(`${info.file.name} ${response.message}`)
                    }
                } else if (status === 'error') {
                    message.error(`${info.file.name} 上传失败`)
                }
            },
            onRemove: (file) => {
                const response = file.response
                if (typeof response.Id === "string") {
                    RequestFiles.onFileDelete(response.Id)
                }
            },
        }
        const { PageState } = this.Store;
        return (
            <Modal
                title="导入"
                centered
                visible={PageState.visiblePort}
                destroyOnClose={true}
                width={600}
                cancelText="取消"
                footer={null}
                onCancel={this.onCancel.bind(this)}
            >
                <div >
                    <div >
                        导入说明：请下载模版，然后在把信息输入到模版中   <Divider type="vertical" /> <Button icon="download" onClick={this.onTemplate.bind(this)}>下载模板</Button>
                    </div>
                    <Divider style={{ margin: "5px 0" }} />
                    <Upload.Dragger {...DraggerProps}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">单击或拖动文件到该区域上载</p>
                    </Upload.Dragger>
                </div>
            </Modal>
        );
    }
}