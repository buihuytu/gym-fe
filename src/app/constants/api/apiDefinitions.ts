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
    SYS_OTHER_LIST_GET_LIST_BY_TYPE = '/api/SysOtherList/GetListByType?type=',

    //SYS_USER
    SYS_USER_QUERY_LIST = '/api/SysUser/QueryList',
    SYS_USER_CREATE = '/api/SysUser/Create',
    SYS_USER_READ = '/api/SysUser/GetById?id=',
    SYS_USER_UPDATE = '/api/SysUser/Update',
    SYS_USER_DELETE_IDS = '/api/SysUser/DeleteIds',

    //PER_EMPLOYEE
    PER_EMPLOYEE_QUERY_LIST = '/api/PerEmployee/QueryList',
    PER_EMPLOYEE_CREATE = '/api/PerEmployee/Create',
    PER_EMPLOYEE_READ = '/api/PerEmployee/GetById?id=',
    PER_EMPLOYEE_UPDATE = '/api/PerEmployee/Update',
    PER_EMPLOYEE_DELETE_IDS = '/api/PerEmployee/DeleteIds',
}