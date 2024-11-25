<?php

use Carbon\Carbon;

if (!function_exists('generateUniqueId')) {
    function generateUniqueId($prefix)
    {
        $microtime = microtime(true);
        $dateTime = Carbon::createFromTimestamp($microtime)->format('dmyHisv'); // Format: YYMMDDHHMMSSu
        return substr($prefix . '-' . $dateTime, 0, 20);
    }
}
