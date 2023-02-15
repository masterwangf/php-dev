FROM php:7.4.30-fpm
#维护者信息
#时区
ENV TZ Asia/Shanghai
RUN date -R

WORKDIR /var/www

RUN sed -i "s@http://deb.debian.org@https://mirrors.aliyun.com@g" /etc/apt/sources.list
RUN sed -i "s@http://security.debian.org@https://mirrors.aliyun.com@g" /etc/apt/sources.list
RUN cat /etc/apt/sources.list
RUN rm -rf /var/lib/apt/lists/*
RUN apt-get update --fix-missing

RUN apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev  libzip-dev libldap2-dev libcurl4-openssl-dev pkg-config libssl-dev \
    && docker-php-ext-configure gd --with-freetype=/usr/include --with-jpeg=/usr/include/jpeg \
    && docker-php-ext-install gd mysqli opcache pdo_mysql bcmath zip ldap pcntl

# 安装redis扩展
ENV PHPREDIS_VERSION 5.3.7
RUN pecl install redis-$PHPREDIS_VERSION \
    && docker-php-ext-enable redis

# 安装Xdebug扩展
ENV PHPXDEBUG_VERSION 3.1.5
RUN pecl install xdebug-$PHPXDEBUG_VERSION \
    && docker-php-ext-enable xdebug

# 安装swoole扩展
# ENV PHPSWOOLE_VERSION 4.8.9
# RUN pecl install swoole-$PHPSWOOLE_VERSION \
#     && docker-php-ext-enable swoole

# 安装mongodb扩展
ENV PHPMONGODB_VERSION 1.13.0
RUN pecl install mongodb-$PHPMONGODB_VERSION \
    && docker-php-ext-enable mongodb


COPY ./conf.d/  $PHP_INI_DIR/conf.d/

RUN mv "$PHP_INI_DIR/php.ini-development"  "$PHP_INI_DIR/php.ini"

# 安装composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php \
    && php -r "unlink('composer-setup.php');" \
    && mv composer.phar /usr/local/bin/composer \
    && composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/ \
    && composer config -g secure-http false

# 安装其他软件
RUN apt-get install -y git cron
# clear
RUN rm -rf /var/cache/apt/* \
    && rm -rf /var/lib/apt/lists/*
RUN mkdir /var/lib/sessions \
    && chmod o=rwx -R /var/lib/sessions

# 容器启动时执行指令
CMD ["php-fpm"]