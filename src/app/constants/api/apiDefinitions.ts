export enum api{
    QUERY_LIST_TEST = '/api/TrCenter/QueryList?id=2',

    //SYS_OTHER_LIST_TYPE
    SYS_OTHER_LIST_TYPE_QUERY_LIST = '/api/SysOtherListType/QueryList',
    SYS_OTHER_LIST_TYPE_CREATE = '/api/SysOtherListType/Create',
    SYS_OTHER_LIST_TYPE_READ = '/api/SysOtherListType/GetById?id=',
    SYS_OTHER_LIST_TYPE_UPDATE = '/api/SysOtherListType/Update',
    SYS_OTHER_LIST_TYPE_DELETE_IDS = '/api/SysOtherListType/DeleteIds',
    SYS_OTHER_LIST_TYPE_GET_LIST = '/api/SysOtherListType/GetList',

    //SYS_OTHER_LIST
    SYS_OTHER_LIST_QUERY_LIST = '/api/SysOtherList/QueryList',
    SYS_OTHER_LIST_CREATE = '/api/SysOtherList/Create',
    SYS_OTHER_LIST_READ = '/api/SysOtherList/GetById?id=',
    SYS_OTHER_LIST_UPDATE = '/api/SysOtherList/Update',
    SYS_OTHER_LIST_DELETE_IDS = '/api/SysOtherList/DeleteIds',
    SYS_OTHER_LIST_GET_LIST_BY_GROUP = '/api/SysOtherList/GetOtherListByGroup?code=',
    SYS_OTHER_LIST_GET_LIST_BY_CODE = '/api/SysOtherList/GetListByCode?typeCode=',
    SYS_OTHER_LIST_GET_LIST_BY_TYPE = '/api/SysOtherList/GetListByType?type=',

    //SYS_USER
    SYS_USER_QUERY_LIST = '/api/SysUser/QueryList',
    SYS_USER_CREATE = '/api/SysUser/Create',
    SYS_USER_READ = '/api/SysUser/GetById?id=',
    SYS_USER_UPDATE = '/api/SysUser/Update',
    SYS_USER_DELETE_IDS = '/api/SysUser/DeleteIds',

    //PER_CUSTOMER
    PER_CUSTOMER_QUERY_LIST = '/api/PerCustomer/QueryList',
    PER_CUSTOMER_CREATE = '/api/PerCustomer/Create',
    PER_CUSTOMER_READ = '/api/PerCustomer/GetById?id=',
    PER_CUSTOMER_UPDATE = '/api/PerCustomer/Update',
    PER_CUSTOMER_DELETE_IDS = '/api/PerCustomer/DeleteIds',
    PER_CUSTOMER_TOGGLE_ACTIVE = '/api/PerCustomer/ToggleActiveIds',

    //PER_EMPLOYEE
    PER_EMPLOYEE_QUERY_LIST = '/api/PerEmployee/QueryList',
    PER_EMPLOYEE_CREATE = '/api/PerEmployee/Create',
    PER_EMPLOYEE_READ = '/api/PerEmployee/GetById?id=',
    PER_EMPLOYEE_UPDATE = '/api/PerEmployee/Update',
    PER_EMPLOYEE_DELETE_IDS = '/api/PerEmployee/DeleteIds',

    // GYM_PACKAGE 
    GYM_PACKAGE_QUERY_LIST = '/api/GymPackage/QueryList',
    GYM_PACKAGE_CREATE = '/api/GymPackage/Create',
    GYM_PACKAGE_READ = '/api/GymPackage/GetById?id=',
    GYM_PACKAGE_UPDATE = '/api/GymPackage/Update',
    GYM_PACKAGE_DELETE_IDS = '/api/GymPackage/DeleteIds',

    // GYM_SHIFT 
    GYM_SHIFT_QUERY_LIST = '/api/GymShift/QueryList',
    GYM_SHIFT_CREATE = '/api/GymShift/Create',
    GYM_SHIFT_READ = '/api/GymShift/GetById?id=',
    GYM_SHIFT_UPDATE = '/api/GymShift/Update',
    GYM_SHIFT_DELETE_IDS = '/api/GymShift/DeleteIds',
    GYM_SHIFT_GET_LIST = '/api/GymShift/GetList',

    //GOODS_LIST
    GOODS_LIST_QUERY_LIST = '/api/GoodsList/QueryList',
    GOODS_LIST_CREATE = '/api/GoodsList/Create',
    GOODS_LIST_READ = '/api/GoodsList/GetById?id=',
    GOODS_LIST_UPDATE = '/api/GoodsList/Update',
    GOODS_LIST_DELETE_IDS = '/api/GoodsList/DeleteIds',
    GOODS_LIST_GET_LIST = '/api/GoodsList/GetList',
}