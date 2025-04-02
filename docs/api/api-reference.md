# API 参考文档

## 1. 认证相关 API

### 1.1 用户登录
- **路径**: `/api/auth/login`
- **方法**: `POST`
- **描述**: 用户登录接口
- **请求体**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **响应**:
  ```json
  {
    "token": "string",
    "user": {
      "id": "string",
      "email": "string",
      "name": "string"
    }
  }
  ```

### 1.2 用户注册
- **路径**: `/api/auth/register`
- **方法**: `POST`
- **描述**: 用户注册接口
- **请求体**:
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string"
  }
  ```
- **响应**:
  ```json
  {
    "message": "string",
    "user": {
      "id": "string",
      "email": "string",
      "name": "string"
    }
  }
  ```

## 2. 用户相关 API

### 2.1 获取用户信息
- **路径**: `/api/user/profile`
- **方法**: `GET`
- **描述**: 获取当前登录用户信息
- **请求头**:
  ```
  Authorization: Bearer <token>
  ```
- **响应**:
  ```json
  {
    "id": "string",
    "email": "string",
    "name": "string",
    "createdAt": "string"
  }
  ```

## 3. 错误码说明

### 3.1 HTTP 状态码
- 200: 请求成功
- 400: 请求参数错误
- 401: 未授权
- 403: 禁止访问
- 404: 资源不存在
- 500: 服务器内部错误

### 3.2 业务错误码
- 1001: 用户不存在
- 1002: 密码错误
- 1003: 邮箱已存在
- 1004: 验证码错误

## 4. 接口规范

### 4.1 请求格式
- Content-Type: application/json
- 时间格式: ISO 8601
- 分页参数: page, pageSize

### 4.2 响应格式
```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

## 5. 接口版本控制

### 5.1 版本号规则
- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 5.2 版本标识
- 在 URL 中使用版本号：`/api/v1/...`
- 在请求头中使用版本号：`X-API-Version: 1.0` 