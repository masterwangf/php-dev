FROM php:7.1-fpm

# 更新为国内镜像
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak \
    && echo 'deb http://mirrors.163.com/debian/ stretch main non-free contrib' > /etc/apt/sources.list \
    && echo 'deb http://mirrors.163.com/debian/ stretch-updates main non-free contrib' >> /etc/apt/sources.list \
    && echo 'deb http://mirrors.163.com/debian-security/ stretch/updates main non-free contrib' >> /etc/apt/sources.list \
    && apt-get update

# RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak \
#     && echo 'deb http://mirrors.aliyun.com/debian stretch main' > /etc/apt/sources.list \
#     && echo 'deb http://mirrors.aliyun.com/debian stretch-updates main' >> /etc/apt/sources.list \
#     && echo 'deb http://mirrors.aliyun.com/debian-security stretch/updates main' >> /etc/apt/sources.list \
#     && apt-get update 

# RUN apt-get update && apt-get upgrade
RUN apt-get install -y --allow-remove-essential libtinfo5 wget vim

RUN wget -P /etc/ssl/certs/ http://curl.haxx.se/ca/cacert.pem --no-check-certificate 

RUN chmod 744 /etc/ssl/certs/cacert.pem

RUN pecl channel-update pecl.php.net


RUN docker-php-ext-install -j$(nproc) bcmath calendar exif gettext sockets dba mysqli pcntl pdo_mysql shmop sysvmsg sysvsem sysvshm iconv

# GD 扩展
RUN apt-get install -y --no-install-recommends --allow-downgrades zlib1g=1:1.2.8.dfsg-5 libfreetype6-dev libjpeg62-turbo-dev libpng-dev zlib1g-dev \
	&& rm -r /var/lib/apt/lists/* \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include \
    && docker-php-ext-install -j$(nproc) gd

# RUN rm -rf /etc/apt/sources.list \
#     && mv /etc/apt/sources.list.bak /etc/apt/sources.list \
#     && apt-get update
# imagick 扩展
# RUN apt-get update \
#     && apt-get install -y --allow-downgrades imagemagick libmagickcore-6.q16-dev=8:6.9.7.4+dfsg-11+deb9u11 libmagickwand-6.q16-dev=8:6.9.7.4+dfsg-11+deb9u11 libmagick++-6.q16-dev \
# 	&& rm -r /var/lib/apt/lists/* \
#     && pecl install imagick \
#     && docker-php-ext-enable imagick

# mcrypt 扩展
# RUN pecl install mcrypt-1.0.2 \
    # && docker-php-ext-enable mcrypt

# Memcached 扩展
# RUN pecl install memcached \
    # && docker-php-ext-enable memcached

# redis 扩展
# RUN pecl install redis && docker-php-ext-enable redis

# opcache 扩展
#RUN docker-php-ext-configure opcache --enable-opcache && docker-php-ext-install opcache

# xdebug 扩展
#RUN pecl install xdebug-2.7.2 && docker-php-ext-enable xdebug

# swoole 扩展
# RUN pecl install swoole && docker-php-ext-enable swoole

# 镜像信息
LABEL Author="fei"
LABEL Version="2021.02"
LABEL Description="PHP7.1开发环境镜像."

