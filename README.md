# PHP本地集成开发环境

目前已支持以下软件：

- Nginx1.15
- PHP7.1.*
- PHP7.4.30
- MySQL5.7.*
- Redis6.2.7
- MongoDB5.0.9

## 使用方式

> 请确保主机已经安装docker和docker-compose，安装步骤省略，可参考以下文档：

- ```Windows```: <https://yeasy.gitbook.io/docker_practice/install/windows>

- ```macOS```: <https://yeasy.gitbook.io/docker_practice/install/mac>

### 1. 克隆仓库

```shell
git clone https://github.com/masterwangf/php-dev.git
```

### 2. 配置.env文件

将```.env.sample```文件名复制并改名为```.env```

配置项说明如下：

| 参数       | 说明     | 示例                            |
|----------|--------|-------------------------------|
| WORK_DIR | 项目统一路径 | ```/Users/yourname/Projects``` |

### 3. 创建nginx配置文件

在```./service/nginx/conf.d```中创建一个新网站的配置，例如：

- larave项目

```text
server {
    listen       80;
    server_name  hostname;

    #charset koi8-r;
    access_log  /var/log/nginx/access.log  main;
    error_log  /var/log/nginx/error.log;

    root  {{ROOT_PATH}}; #项目index.php文件目录
    index  index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass php74:9000;    #这里php74是容器名称，代表使用的版本是7.4；如果使用7.1版本则修改为php71
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### 4. 修改docker-compose.yml文件

根据项目实际情况修改，注释掉不需要的服务。

### 5. 启动容器

在根目录下执行```docker-compose up```或```docker-compose up -d```启动容器

### 6. 常见问题

#### 6.1 如何在容器内访问宿主机端口？

- 方式一： 将docker-compose.yml文件的网络模式由bridge（宿主机和容器网络隔离）改为host，此时应将```ports```参数都注释掉，否则容器启动会报错。

以nginx服务为例：

```yml
nginx:
    build: ./services/nginx
    container_name: nginx
    restart: always
    tty: true
    env_file:
      - ./.env
    volumes: 
      - ${WORK_DIR}:/var/www
      - ./services/nginx/logs:/var/log/nginx
      - ./services/nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./services/nginx/conf.d:/etc/nginx/conf.d
      - ./www:/usr/share/nginx/html
    environment:
      - TZ=Asia/Shanghai
    networks_mode: host  #跟宿主机在同一个网络
```

然后将最底部的```networks```参数注释掉，重新启动容器。

- 方式二： Docker版本高于18.03的加入了新特性，容器内可以通过```host.docker.internal```来访问主机
