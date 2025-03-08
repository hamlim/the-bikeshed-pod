import { Mic2, PlayCircle, Rss } from "lucide-react";
import { Link } from "waku";
import { EpisodeCard } from "#components/episode-card";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/card";
import episodeMetadata from "#episode-metadata";
import { Button } from "#ui/button";

let latestEpisodes = episodeMetadata.slice(0, 3);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="px-4 py-24 md:px-6 lg:px-8 bg-gradient-to-b from-stone-900 to-stone-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-base text-center">
              <svg
                width="250"
                height="auto"
                viewBox="0 0 2615 940"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <title>The Bikeshed Podcast</title>
                <path d="M1119.59 159.891V3.91337H1150.65V159.891H1119.59ZM1068.81 27.9448V0.512695H1201.44V27.9448H1068.81Z" />
                <path d="M1214.63 159.891V0.512695H1245.46V159.891H1214.63ZM1314.61 159.891V0.512695H1345.44V159.891H1314.61ZM1234.13 91.1974V63.992H1323.22V91.1974H1234.13Z" />
                <path d="M1369.92 159.891V0.512695H1400.76V159.891H1369.92ZM1392.6 159.891V132.686H1480.79V159.891H1392.6ZM1392.6 91.6508V65.3522H1472.85V91.6508H1392.6ZM1392.6 27.7181V0.512695H1479.65V27.7181H1392.6Z" />
                <path d="M843.718 878.017V852.852H880.672C885.509 852.852 889.892 851.869 893.822 849.904C897.751 847.939 900.85 845.143 903.117 841.516C905.384 837.737 906.517 833.203 906.517 827.913C906.517 822.774 905.384 818.316 903.117 814.537C900.85 810.759 897.751 807.887 893.822 805.922C889.892 803.957 885.509 802.975 880.672 802.975H843.718V777.81H883.846C893.973 777.81 903.041 779.85 911.052 783.931C919.213 788.012 925.637 793.831 930.322 801.388C935.008 808.794 937.35 817.636 937.35 827.913C937.35 838.191 935.008 847.108 930.322 854.665C925.637 862.071 919.213 867.815 911.052 871.895C903.041 875.976 893.973 878.017 883.846 878.017H843.718ZM821.047 937.188V777.81H851.88V937.188H821.047Z" />
                <path d="M1035.34 939.682C1023.7 939.682 1012.82 937.566 1002.69 933.334C992.716 929.102 983.95 923.283 976.392 915.877C968.987 908.32 963.168 899.554 958.936 889.579C954.704 879.452 952.588 868.646 952.588 857.159C952.588 845.672 954.628 835.017 958.709 825.193C962.941 815.217 968.76 806.527 976.166 799.121C983.723 791.564 992.489 785.745 1002.46 781.664C1012.44 777.432 1023.25 775.316 1034.88 775.316C1046.67 775.316 1057.56 777.432 1067.53 781.664C1077.51 785.745 1086.2 791.564 1093.6 799.121C1101.16 806.527 1107.05 815.217 1111.29 825.193C1115.52 835.168 1117.63 845.899 1117.63 857.386C1117.63 868.872 1115.52 879.604 1111.29 889.579C1107.05 899.554 1101.16 908.32 1093.6 915.877C1086.2 923.283 1077.51 929.102 1067.53 933.334C1057.71 937.566 1046.98 939.682 1035.34 939.682ZM1034.88 910.89C1045.16 910.89 1054.08 908.623 1061.64 904.088C1069.19 899.554 1075.09 893.282 1079.32 885.271C1083.7 877.261 1085.89 867.89 1085.89 857.159C1085.89 849.3 1084.69 842.12 1082.27 835.621C1079.85 829.122 1076.37 823.53 1071.84 818.845C1067.3 814.008 1061.94 810.305 1055.74 807.736C1049.54 805.167 1042.59 803.882 1034.88 803.882C1024.91 803.882 1016.07 806.149 1008.36 810.683C1000.8 815.066 994.832 821.263 990.449 829.274C986.217 837.284 984.101 846.579 984.101 857.159C984.101 865.17 985.31 872.5 987.728 879.15C990.297 885.8 993.774 891.468 998.157 896.153C1002.69 900.839 1008.06 904.466 1014.25 907.036C1020.6 909.605 1027.48 910.89 1034.88 910.89Z" />
                <path d="M1155.06 937.188V909.756H1195.64C1205.92 909.756 1214.91 907.64 1222.62 903.408C1230.33 899.025 1236.3 892.904 1240.53 885.045C1244.92 877.185 1247.11 867.89 1247.11 857.159C1247.11 846.73 1244.92 837.662 1240.53 829.954C1236.15 822.094 1230.1 816.049 1222.4 811.817C1214.69 807.434 1205.77 805.242 1195.64 805.242H1154.38V777.81H1196.1C1207.89 777.81 1218.77 779.775 1228.74 783.704C1238.87 787.634 1247.64 793.226 1255.04 800.481C1262.6 807.585 1268.42 815.973 1272.5 825.646C1276.73 835.319 1278.85 845.899 1278.85 857.386C1278.85 868.872 1276.73 879.528 1272.5 889.352C1268.42 899.025 1262.67 907.489 1255.27 914.744C1247.86 921.847 1239.1 927.364 1228.97 931.294C1218.99 935.223 1208.19 937.188 1196.55 937.188H1155.06ZM1133.98 937.188V777.81H1164.81V937.188H1133.98Z" />
                <path d="M1369.16 939.455C1357.52 939.455 1346.71 937.415 1336.74 933.334C1326.76 929.102 1318 923.283 1310.44 915.877C1303.03 908.32 1297.29 899.554 1293.21 889.579C1289.28 879.604 1287.32 868.872 1287.32 857.386C1287.32 845.899 1289.28 835.168 1293.21 825.193C1297.29 815.217 1303.03 806.527 1310.44 799.121C1318 791.715 1326.69 785.896 1336.51 781.664C1346.49 777.432 1357.37 775.316 1369.16 775.316C1381.85 775.316 1393.04 777.432 1402.71 781.664C1412.38 785.745 1420.92 791.413 1428.33 798.667L1407.47 819.525C1403.09 814.688 1397.72 810.91 1391.38 808.189C1385.03 805.469 1377.62 804.109 1369.16 804.109C1361.75 804.109 1354.95 805.393 1348.75 807.963C1342.71 810.381 1337.42 814.008 1332.88 818.845C1328.35 823.53 1324.87 829.198 1322.46 835.848C1320.04 842.347 1318.83 849.526 1318.83 857.386C1318.83 865.396 1320.04 872.651 1322.46 879.15C1324.87 885.649 1328.35 891.317 1332.88 896.153C1337.42 900.839 1342.71 904.466 1348.75 907.036C1354.95 909.605 1361.75 910.89 1369.16 910.89C1378.08 910.89 1385.71 909.529 1392.06 906.809C1398.56 904.088 1404 900.234 1408.38 895.247L1429.24 916.104C1421.83 923.51 1413.22 929.253 1403.39 933.334C1393.57 937.415 1382.16 939.455 1369.16 939.455Z" />
                <path d="M1426.8 937.188L1490.96 777.81H1516.13L1580.06 937.188H1547.18L1497.76 806.376H1509.1L1458.99 937.188H1426.8ZM1460.81 907.489V881.644H1546.5V907.489H1460.81Z" />
                <path d="M1633.71 939.455C1620.87 939.455 1609.83 937.264 1600.61 932.881C1591.55 928.498 1583.31 921.923 1575.9 913.157L1596.31 892.753C1600.99 898.95 1606.43 903.786 1612.63 907.262C1618.83 910.587 1626.38 912.25 1635.3 912.25C1643.31 912.25 1649.66 910.663 1654.34 907.489C1659.18 904.315 1661.6 899.932 1661.6 894.34C1661.6 889.503 1660.24 885.574 1657.52 882.551C1654.8 879.528 1651.17 876.959 1646.64 874.843C1642.25 872.727 1637.34 870.837 1631.9 869.175C1626.61 867.361 1621.24 865.321 1615.8 863.054C1610.51 860.786 1605.6 857.99 1601.07 854.665C1596.68 851.189 1593.13 846.806 1590.41 841.516C1587.69 836.075 1586.33 829.273 1586.33 821.112C1586.33 811.439 1588.67 803.202 1593.36 796.4C1598.04 789.599 1604.47 784.385 1612.63 780.757C1620.79 777.13 1630.01 775.316 1640.29 775.316C1651.17 775.316 1660.99 777.357 1669.76 781.437C1678.53 785.518 1685.71 790.808 1691.3 797.307L1670.89 817.711C1666.21 812.572 1661.37 808.794 1656.38 806.376C1651.55 803.957 1646.03 802.748 1639.83 802.748C1632.73 802.748 1627.14 804.109 1623.06 806.829C1618.98 809.55 1616.94 813.479 1616.94 818.618C1616.94 823.001 1618.3 826.553 1621.02 829.274C1623.74 831.994 1627.29 834.337 1631.67 836.302C1636.21 838.266 1641.12 840.156 1646.41 841.969C1651.85 843.783 1657.22 845.823 1662.51 848.091C1667.95 850.358 1672.86 853.305 1677.24 856.932C1681.78 860.56 1685.4 865.245 1688.12 870.989C1690.84 876.581 1692.21 883.533 1692.21 891.846C1692.21 906.658 1686.99 918.296 1676.56 926.76C1666.13 935.224 1651.85 939.455 1633.71 939.455Z" />
                <path d="M1741.47 937.188V781.211H1772.53V937.188H1741.47ZM1690.69 805.242V777.81H1823.31V805.242H1690.69Z" />
                <path d="M66.1619 645.702V578.53H157.559C174.444 578.53 187.658 573.575 197.201 563.665C206.745 553.754 211.517 541.641 211.517 527.326C211.517 517.415 209.314 508.606 204.91 500.898C200.505 493.19 194.265 487.133 186.19 482.728C178.481 478.324 168.938 476.121 157.559 476.121H66.1619V410.602H150.402C164.717 410.602 176.279 407.115 185.088 400.141C193.898 392.799 198.302 381.788 198.302 367.105C198.302 352.79 193.898 342.146 185.088 335.172C176.279 327.83 164.717 324.16 150.402 324.16H66.1619V256.988H166.919C191.879 256.988 212.985 261.577 230.236 270.753C247.855 279.929 261.253 292.226 270.429 307.642C279.606 323.059 284.194 340.127 284.194 358.847C284.194 382.705 276.486 402.894 261.069 419.411C245.653 435.929 222.895 447.307 192.797 453.547L194.999 424.366C227.667 430.606 252.81 443.27 270.429 462.357C288.415 481.444 297.408 504.935 297.408 532.832C297.408 554.121 292.086 573.392 281.441 590.643C271.163 607.528 256.114 620.925 236.293 630.836C216.839 640.747 193.347 645.702 165.818 645.702H66.1619ZM0.0916748 645.702V256.988H85.4324V645.702H0.0916748Z" />
                <path d="M344.714 645.702V256.988H431.156V645.702H344.714Z" />
                <path d="M733.021 645.702L575.554 443.086L728.066 256.988H834.88L663.097 459.053V423.816L840.385 645.702H733.021ZM497.921 645.702V256.988H584.363V645.702H497.921Z" />
                <path d="M878.03 645.702V256.988H964.472V645.702H878.03ZM944.101 645.702V570.822H1157.18V645.702H944.101ZM944.101 483.279V411.152H1137.91V483.279H944.101ZM944.101 331.317V256.988H1154.42V331.317H944.101Z" />
                <path d="M1333.49 651.758C1301.56 651.758 1274.03 646.619 1250.91 636.342C1228.15 625.697 1207.23 609.73 1188.14 588.441L1244.3 532.832C1256.78 547.147 1270.54 558.342 1285.59 566.417C1301.01 574.126 1318.81 577.98 1339 577.98C1357.35 577.98 1371.48 574.676 1381.39 568.069C1391.67 561.462 1396.81 552.286 1396.81 540.54C1396.81 529.895 1393.51 521.269 1386.9 514.662C1380.29 508.055 1371.48 502.366 1360.47 497.594C1349.83 492.823 1337.9 488.234 1324.68 483.83C1311.84 479.425 1298.99 474.47 1286.14 468.964C1273.3 463.091 1261.37 455.933 1250.36 447.491C1239.71 438.682 1231.08 427.853 1224.48 415.006C1217.87 401.792 1214.57 385.275 1214.57 365.454C1214.57 341.595 1220.26 321.04 1231.64 303.788C1243.38 286.536 1259.53 273.506 1280.09 264.697C1300.64 255.52 1324.32 250.932 1351.11 250.932C1378.27 250.932 1403.05 255.704 1425.44 265.247C1448.2 274.791 1466.92 287.821 1481.6 304.339L1425.44 359.948C1413.7 347.835 1401.77 338.842 1389.65 332.969C1377.91 327.096 1364.51 324.16 1349.46 324.16C1334.41 324.16 1322.48 327.096 1313.67 332.969C1304.86 338.475 1300.46 346.55 1300.46 357.195C1300.46 367.106 1303.76 375.181 1310.37 381.421C1316.98 387.294 1325.6 392.432 1336.25 396.837C1347.26 401.242 1359.19 405.646 1372.03 410.051C1385.25 414.456 1398.28 419.595 1411.13 425.468C1423.97 431.341 1435.72 438.865 1446.36 448.042C1457.38 456.851 1466.18 468.23 1472.79 482.178C1479.4 495.759 1482.7 512.644 1482.7 532.832C1482.7 569.904 1469.49 599.086 1443.06 620.375C1416.63 641.297 1380.11 651.758 1333.49 651.758Z" />
                <path d="M1529.67 645.702V256.988H1616.11V645.702H1529.67ZM1770.27 645.702V256.988H1857.27V645.702H1770.27ZM1581.42 483.279V408.399H1798.9V483.279H1581.42Z" />
                <path d="M1923.76 645.702V256.988H2010.2V645.702H1923.76ZM1989.83 645.702V570.822H2202.9V645.702H1989.83ZM1989.83 483.279V411.152H2183.63V483.279H1989.83ZM1989.83 331.317V256.988H2200.15V331.317H1989.83Z" />
                <path d="M2312.76 645.702V569.721H2409.11C2432.61 569.721 2453.16 565.133 2470.78 555.956C2488.4 546.413 2501.98 532.648 2511.52 514.662C2521.07 496.677 2525.84 475.387 2525.84 450.795C2525.84 426.202 2520.88 405.096 2510.97 387.477C2501.43 369.858 2487.85 356.277 2470.23 346.734C2452.98 337.19 2432.61 332.419 2409.11 332.419H2310.01V256.988H2410.21C2439.58 256.988 2466.56 261.76 2491.15 271.304C2516.11 280.48 2537.77 293.878 2556.12 311.496C2574.84 328.748 2589.16 349.303 2599.07 373.162C2609.34 396.654 2614.48 422.715 2614.48 451.345C2614.48 479.609 2609.34 505.67 2599.07 529.528C2589.16 553.387 2575.02 573.942 2556.67 591.194C2538.32 608.446 2516.66 621.843 2491.7 631.387C2467.11 640.93 2440.31 645.702 2411.32 645.702H2312.76ZM2254.4 645.702V256.988H2340.84V645.702H2254.4Z" />
              </svg>
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-white dark:text-base">
              Where developers debate the small stuff that <s>doesn't</s> matter
              <mark>(s)</mark>
              <span className="inline-block align-middle ml-0.5 w-[2px] h-[1.2em] bg-white animate-cursor" />
              . Join us for in-depth discussions about coding practices, tools,
              and tech decisions.
            </p>
            <div className="flex gap-4 justify-center pt-8">
              <Button asChild size="lg" className="gap-2">
                <Link
                  to={`/episodes/${episodeMetadata[0].episodeId.toLowerCase()}`}
                >
                  <PlayCircle className="w-5 h-5" />
                  Latest Episode
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic2 className="w-5 h-5" />
                  <span>
                    Weekly<em>ish</em>
                  </span>{" "}
                  Episodes
                </CardTitle>
                <CardDescription>
                  New episodes (usually) every week discussing the latest in
                  tech
                </CardDescription>
              </CardHeader>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  30-Minute Format
                </CardTitle>
                <CardDescription>
                  Concise, focused discussions perfect for your commute
                </CardDescription>
              </CardHeader>
            </Card> */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rss className="w-5 h-5" />
                  Available Everywhere
                </CardTitle>
                <CardDescription>
                  Listen on Spotify, Apple Podcasts, or your favorite platform
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Episodes Section */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Latest Episodes</h2>
          <div className="grid gap-6">
            {latestEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
