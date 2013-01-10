<?php

define( 'DB_DSN',           'mysql:dbname=;host=;port=;' );
define( 'DB_USER',          '' );
define( 'DB_PASS',          '' );

try {
    $dbh = new PDO( DB_DSN, DB_USER, DB_PASS );
    $dbh->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

} catch ( PDOException $e ) {
    printf( 'Database Error: %s<br />', $e->getMessage( ) );
}