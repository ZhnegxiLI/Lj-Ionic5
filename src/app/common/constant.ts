
// 单位转换值
export const unitConvert = [
    { label: '公斤', equivalence: null },
    { label: '件', equivalence: null },
    { label: '码', equivalence: 0.91440 },
    { label: '米', equivalence: 0 },
    { label: '匹', equivalence: null },
];

export const permission = {
    financialPermission: { code: 'OrderModule_financialValidation', label: '财务权限' },
    managerPermission: { code: 'OrderModule_managerValidation', label: '经理权限' }
};

export const orderStatus = [
    { code: 0, label: '未提交' },
    { code: 1, label: '提交到财务' },
    { code: 2, label: '财务不同意' },
    { code: 3, label: '财务同意' },
    { code: 4, label: '经理不同意' },
    { code: 5, label: '经理同意' },
    { code: 6, label: '已作废' },
    { code: 7, label: '冲单' }
];

export const orderType = [
    { code: 'O', label: '销售订单', disabled: true },
    { code: 'I', label: '采购订单', disabled: true }
];
