import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface Module {
  id: number;
  title: string;
  icon: string;
  description: string;
  completed: boolean;
  locked: boolean;
  topics: string[];
}

interface Scenario {
  id: number;
  title: string;
  description: string;
  situation: string;
  danger: 'critical' | 'high' | 'medium' | 'low';
  options: {
    text: string;
    correct: boolean;
    feedback: string;
  }[];
}

const Index = () => {
  const { toast } = useToast();
  const [currentModule, setCurrentModule] = useState(1);
  const [overallProgress, setOverallProgress] = useState(20);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [certificateEarned, setCertificateEarned] = useState(false);

  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: 'Знакомство с установкой',
      icon: 'Factory',
      description: 'Описание процесса каталитического риформинга, блок-схема, технологические единицы',
      completed: false,
      locked: false,
      topics: [
        'Принципы каталитического риформинга',
        'Технологическая схема установки',
        'Основные аппараты и оборудование',
        'Режимные параметры процесса',
      ],
    },
    {
      id: 2,
      title: 'Основные риски и опасности',
      icon: 'AlertTriangle',
      description: 'Классификация опасностей: взрыв, пожар, токсичность, статическое электричество',
      completed: false,
      locked: true,
      topics: [
        'Пожаровзрывоопасность',
        'Токсичные вещества',
        'Высокое давление и температура',
        'Статическое электричество',
      ],
    },
    {
      id: 3,
      title: 'Аварийные сценарии',
      icon: 'Flame',
      description: 'Типичные ЧП: утечка водорода, пожары, разгерметизация и алгоритмы действий',
      completed: false,
      locked: true,
      topics: [
        'Утечка водорода',
        'Пожары на установке',
        'Разгерметизация оборудования',
        'Действия персонала при ЧП',
      ],
    },
    {
      id: 4,
      title: 'Практические тренинги',
      icon: 'Gamepad2',
      description: 'Интерактивные симуляции, фото-кейсы, викторины по безопасности',
      completed: false,
      locked: true,
      topics: [
        'Симулятор аварийных ситуаций',
        'Разбор реальных случаев',
        'Практические упражнения',
        'Проверка навыков',
      ],
    },
    {
      id: 5,
      title: 'Тестирование и сертификация',
      icon: 'Award',
      description: 'Закрепление знаний, финальный тест, получение сертификата',
      completed: false,
      locked: true,
      topics: [
        'Итоговое тестирование',
        'Проверка усвоения материала',
        'Выдача сертификата',
        'Рекомендации по дальнейшему обучению',
      ],
    },
  ]);

  const scenarios: Scenario[] = [
    {
      id: 1,
      title: 'Утечка водорода',
      description: 'Обнаружена утечка водорода в зоне компрессоров',
      situation:
        'Во время обхода установки вы почувствовали характерный запах и услышали шипение в районе водородного компрессора. Переносной газоанализатор показывает концентрацию водорода 2% об.',
      danger: 'critical',
      options: [
        {
          text: 'Попытаться самостоятельно перекрыть задвижку',
          correct: false,
          feedback:
            'ОПАСНО! При концентрации >2% водород взрывоопасен. Любая искра может привести к взрыву.',
        },
        {
          text: 'Активировать аварийную сигнализацию, эвакуировать персонал, вызвать аварийную службу',
          correct: true,
          feedback:
            'ПРАВИЛЬНО! Это критическая ситуация. Необходима немедленная эвакуация и вызов профессионалов.',
        },
        {
          text: 'Включить вентиляцию и продолжить наблюдение',
          correct: false,
          feedback: 'НЕВЕРНО! Включение электрооборудования может вызвать искру и взрыв.',
        },
      ],
    },
    {
      id: 2,
      title: 'Пожар на насосной',
      description: 'Возгорание в районе насосов подачи сырья',
      situation:
        'Вы обнаружили возгорание в районе центробежного насоса. Пламя высотой около 1 метра, очаг локализован. Рядом находятся другие работники.',
      danger: 'high',
      options: [
        {
          text: 'Использовать огнетушитель для тушения очага',
          correct: false,
          feedback:
            'ЧАСТИЧНО ВЕРНО, но сначала нужно отключить насос и активировать сигнализацию. При пожаре на нефтеустановке первично — остановка оборудования.',
        },
        {
          text: 'Активировать пожарную сигнализацию, остановить насос с безопасного расстояния, использовать огнетушитель',
          correct: true,
          feedback:
            'ПРАВИЛЬНО! Последовательность действий верная: сигнал → остановка оборудования → тушение.',
        },
        {
          text: 'Покинуть зону и ждать пожарных',
          correct: false,
          feedback:
            'НЕПОЛНОЕ РЕШЕНИЕ. Малый очаг можно потушить, но нужно сначала подать сигнал и остановить оборудование.',
        },
      ],
    },
    {
      id: 3,
      title: 'Разгерметизация реактора',
      description: 'Обнаружена течь фланцевого соединения реактора',
      situation:
        'При осмотре реактора риформинга вы заметили течь через фланцевое соединение. Давление в реакторе 25 атм, температура 480°C. Течь небольшая, но стабильная.',
      danger: 'high',
      options: [
        {
          text: 'Попытаться подтянуть болты фланца',
          correct: false,
          feedback:
            'КРАЙНЕ ОПАСНО! При высокой температуре и давлении это может привести к резкой разгерметизации и травмам.',
        },
        {
          text: 'Инициировать аварийную остановку реактора, сообщить диспетчеру, эвакуировать зону',
          correct: true,
          feedback:
            'ПРАВИЛЬНО! Единственно верное решение — остановка и охлаждение реактора перед любыми работами.',
        },
        {
          text: 'Продолжить эксплуатацию и усилить контроль',
          correct: false,
          feedback: 'ОПАСНО! Течь может усилиться, что приведет к крупной аварии.',
        },
      ],
    },
    {
      id: 4,
      title: 'Отравление сероводородом',
      description: 'Работник потерял сознание в зоне сепараторов',
      situation:
        'Ваш коллега зашёл в зону сепараторов для осмотра оборудования. Через 2 минуты связь прервалась. Через окно видно, что человек лежит без движения. Газоанализатор на входе показывает H₂S 150 мг/м³ (ПДК 10 мг/м³).',
      danger: 'critical',
      options: [
        {
          text: 'Немедленно войти и вытащить пострадавшего',
          correct: false,
          feedback:
            'СМЕРТЕЛЬНО ОПАСНО! Вы станете второй жертвой. H₂S при такой концентрации вызывает мгновенную потерю сознания.',
        },
        {
          text: 'Активировать аварийную сигнализацию, вызвать газоспасательную службу, надеть СИЗОД и войти только с напарником',
          correct: true,
          feedback:
            'ПРАВИЛЬНО! При газоопасных работах вход только с изолирующим противогазом, страховкой и в паре. Каждая секунда счёт, но безопасность спасателей критична.',
        },
        {
          text: 'Открыть двери для проветривания и подождать',
          correct: false,
          feedback:
            'НЕВЕРНО! Время критично для пострадавшего. Проветривание займет 20-30 минут, человек может погибнуть. Нужна профессиональная эвакуация.',
        },
      ],
    },
    {
      id: 5,
      title: 'Перегрев катализатора',
      description: 'Температура реактора растёт выше нормы',
      situation:
        'Оператор сообщает, что температура в 3-м реакторе выросла с 505°C до 545°C за 15 минут. Рабочая норма 500-510°C. Давление стабильно 22 атм. Расход сырья в норме.',
      danger: 'high',
      options: [
        {
          text: 'Увеличить расход циркулирующего водорода для охлаждения',
          correct: true,
          feedback:
            'ПРАВИЛЬНО! Увеличение циркуляции H₂ снизит температуру и предотвратит спекание катализатора. Параллельно нужно найти причину перегрева.',
        },
        {
          text: 'Немедленно остановить подачу сырья',
          correct: false,
          feedback:
            'ОПАСНО! Резкая остановка может привести к локальным перегревам и разрушению катализатора. Сначала регулирование режима.',
        },
        {
          text: 'Продолжить работу и наблюдать',
          correct: false,
          feedback:
            'КРАЙНЕ ОПАСНО! При 550°C начинается спекание платины и разрушение катализатора. Возможен неуправляемый рост температуры и взрыв.',
        },
      ],
    },
    {
      id: 6,
      title: 'Загазованность в помещении КИПиА',
      description: 'Сработала сигнализация газоанализатора',
      situation:
        'В помещении операторной сработала сигнализация по углеводородам — 15% НКПР (нижний концентрационный предел распространения пламени). Источник утечки не определён. В помещении 4 оператора.',
      danger: 'high',
      options: [
        {
          text: 'Эвакуировать персонал, обесточить помещение, вызвать аварийную службу',
          correct: true,
          feedback:
            'ПРАВИЛЬНО! При 10-25% НКПР — предельная опасность взрыва. Обязательна эвакуация и обесточивание для исключения искр.',
        },
        {
          text: 'Открыть окна и двери для проветривания',
          correct: false,
          feedback:
            'ОПАСНО! Потоки воздуха могут создать взрывоопасную смесь в других помещениях. Плюс механизм открывания окон может дать искру.',
        },
        {
          text: 'Включить аварийную вентиляцию',
          correct: false,
          feedback:
            'СМЕРТЕЛЬНО ОПАСНО! Включение электрооборудования при 15% НКПР приведёт к взрыву. Сначала эвакуация и обесточивание.',
        },
      ],
    },
    {
      id: 7,
      title: 'Остановка циркуляционного насоса',
      description: 'Аварийная остановка насоса ЦВГ (циркуляции водородсодержащего газа)',
      situation:
        'Произошла аварийная остановка циркуляционного насоса ЦВГ. Давление водорода в системе падает с 28 до 20 атм. Температура реакторов 505°C. Резервный насос не запускается (ремонт).',
      danger: 'critical',
      options: [
        {
          text: 'Немедленно остановить подачу сырья, инициировать аварийную остановку блока',
          correct: true,
          feedback:
            'ПРАВИЛЬНО! Без циркуляции H₂ произойдёт неконтролируемое закоксование катализатора, перегрев и возможен взрыв реакторов. Аварийная остановка — единственный выход.',
        },
        {
          text: 'Снизить температуру и продолжить работу на пониженной нагрузке',
          correct: false,
          feedback:
            'КРАЙНЕ ОПАСНО! Даже при низкой температуре без циркуляции H₂ начнётся коксообразование и возможна разгерметизация системы.',
        },
        {
          text: 'Переключить на азотную продувку',
          correct: false,
          feedback:
            'НЕВЕРНО! Азот не предотвратит коксование при высокой температуре. Плюс переключение займёт время, за которое ситуация станет критической.',
        },
      ],
    },
  ];

  const getDangerColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 border-red-400 text-red-900';
      case 'high':
        return 'bg-orange-100 border-orange-400 text-orange-900';
      case 'medium':
        return 'bg-yellow-100 border-yellow-400 text-yellow-900';
      case 'low':
        return 'bg-green-100 border-green-400 text-green-900';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-900';
    }
  };

  const getDangerLabel = (level: string) => {
    switch (level) {
      case 'critical':
        return 'КРИТИЧЕСКИЙ';
      case 'high':
        return 'ВЫСОКИЙ';
      case 'medium':
        return 'СРЕДНИЙ';
      case 'low':
        return 'НИЗКИЙ';
      default:
        return 'НЕИЗВЕСТНЫЙ';
    }
  };

  const handleModuleComplete = (moduleId: number) => {
    const updatedModules = modules.map((mod) => {
      if (mod.id === moduleId) {
        return { ...mod, completed: true };
      }
      if (mod.id === moduleId + 1) {
        return { ...mod, locked: false };
      }
      return mod;
    });
    setModules(updatedModules);
    setOverallProgress(prev => Math.min(prev + 20, 100));
    
    toast({
      title: '✅ Модуль завершён!',
      description: `Вы успешно прошли модуль "${modules[moduleId - 1].title}"`,
    });

    if (moduleId < 5) {
      setCurrentModule(moduleId + 1);
    }
  };

  const handleScenarioAnswer = (scenarioId: number, optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);

    const scenario = scenarios[scenarioId - 1];
    const option = scenario.options[optionIndex];

    if (option.correct) {
      setQuizScore(prev => prev + 1);
      toast({
        title: '✅ Правильно!',
        description: 'Вы действовали согласно протоколам безопасности',
      });
    } else {
      toast({
        title: '❌ Ошибка',
        description: 'Изучите правильный алгоритм действий',
        variant: 'destructive',
      });
    }
  };

  const resetScenario = () => {
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const completedModulesCount = modules.filter(m => m.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-primary rounded-xl">
                  <Icon name="GraduationCap" size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Риски моей установки
                  </h1>
                  <p className="text-gray-600 text-lg mt-1">
                    Программа визуального обучения по промышленной безопасности
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-2 border-primary/20 w-full lg:w-auto">
              <CardContent className="p-5">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                      <Icon name="BookCheck" className="text-primary" size={24} />
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          {completedModulesCount}/5
                        </p>
                        <p className="text-xs text-gray-500">Модулей завершено</p>
                      </div>
                    </div>
                    
                    <Separator orientation="vertical" className="h-12" />
                    
                    <div className="flex items-center gap-3">
                      <Icon name="Target" className="text-secondary" size={24} />
                      <div>
                        <p className="text-2xl font-bold text-secondary">{quizScore}</p>
                        <p className="text-xs text-gray-500">Правильных ответов</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 font-medium">Общий прогресс</span>
                      <span className="text-primary font-bold">{overallProgress}%</span>
                    </div>
                    <Progress value={overallProgress} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {certificateEarned && (
            <Card className="border-2 border-accent bg-gradient-to-r from-accent/10 to-green-50">
              <CardContent className="p-4 flex items-center gap-4">
                <Icon name="Award" size={40} className="text-accent" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">Сертификат получен!</h3>
                  <p className="text-gray-600">
                    Вы успешно завершили программу обучения по промышленной безопасности
                  </p>
                </div>
                <Button className="bg-accent hover:bg-accent/90">
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать
                </Button>
              </CardContent>
            </Card>
          )}
        </header>

        <Tabs value={`module-${currentModule}`} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 h-auto bg-transparent p-0">
            {modules.map((module) => (
              <TabsTrigger
                key={module.id}
                value={`module-${module.id}`}
                onClick={() => !module.locked && setCurrentModule(module.id)}
                disabled={module.locked}
                className="relative flex flex-col items-center gap-2 h-auto py-4 px-3 data-[state=active]:bg-primary data-[state=active]:text-white disabled:opacity-40 border-2 data-[state=active]:border-primary hover:border-primary/50 transition-all"
              >
                {module.completed && (
                  <div className="absolute -top-2 -right-2 bg-accent rounded-full p-1">
                    <Icon name="Check" size={14} className="text-white" />
                  </div>
                )}
                {module.locked && (
                  <Icon name="Lock" size={16} className="absolute top-2 right-2 text-gray-400" />
                )}
                <Icon name={module.icon as any} size={24} />
                <span className="text-xs font-semibold text-center leading-tight">
                  {module.title}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {modules.map((module) => (
            <TabsContent key={module.id} value={`module-${module.id}`} className="space-y-6">
              <Card className="border-2 border-primary/30">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-50">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="p-4 bg-white rounded-xl shadow-sm">
                        <Icon name={module.icon as any} size={40} className="text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl mb-2">{module.title}</CardTitle>
                        <CardDescription className="text-base text-gray-700">
                          {module.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={module.completed ? 'default' : 'secondary'}
                      className={`text-sm px-4 py-2 ${
                        module.completed ? 'bg-accent' : ''
                      }`}
                    >
                      {module.completed ? (
                        <><Icon name="Check" size={16} className="mr-1" /> Завершено</>
                      ) : (
                        <><Icon name="Clock" size={16} className="mr-1" /> В процессе</>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {module.id === 1 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-primary/20">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Icon name="FlaskConical" size={24} className="text-primary" />
                              Процесс риформинга
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              Каталитический риформинг — процесс переработки бензиновых фракций
                              нефти для повышения октанового числа. Процесс протекает при высоких
                              температурах (480-520°C) и давлении (15-40 атм) в присутствии
                              платинового катализатора.
                            </p>
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                              <p className="text-sm font-semibold text-blue-900 mb-2">
                                Ключевые параметры:
                              </p>
                              <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Температура: 480-520°C</li>
                                <li>• Давление: 15-40 атм</li>
                                <li>• Катализатор: Pt/Al₂O₃</li>
                                <li>• Среда: водородсодержащий газ</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-secondary/20">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Icon name="Network" size={24} className="text-secondary" />
                              Технологическая схема
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 mb-4">
                              <p className="text-sm font-semibold text-orange-900 mb-3">
                                Основные блоки установки:
                              </p>
                              <div className="space-y-3">
                                {[
                                  { name: 'Печь', icon: 'Flame' },
                                  { name: 'Реакторный блок', icon: 'Container' },
                                  { name: 'Сепарация', icon: 'Split' },
                                  { name: 'Циркуляция Н₂', icon: 'RefreshCw' },
                                ].map((block, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-3 bg-white rounded p-2"
                                  >
                                    <Icon name={block.icon as any} size={20} className="text-secondary" />
                                    <span className="text-sm font-medium text-gray-700">
                                      {idx + 1}. {block.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Accordion type="single" collapsible className="space-y-3">
                        {module.topics.map((topic, idx) => (
                          <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left font-semibold hover:no-underline">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-sm font-bold text-primary">{idx + 1}</span>
                                </div>
                                {topic}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 pt-2">
                              Детальная информация по теме "{topic}" включает теоретические основы,
                              практические примеры и требования безопасности.
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>

                      <div className="flex justify-end pt-4">
                        <Button
                          size="lg"
                          onClick={() => handleModuleComplete(module.id)}
                          disabled={module.completed}
                          className="gap-2"
                        >
                          {module.completed ? (
                            <>
                              <Icon name="Check" size={20} />
                              Модуль завершён
                            </>
                          ) : (
                            <>
                              Завершить модуль
                              <Icon name="ArrowRight" size={20} />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {module.id === 2 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          {
                            title: 'Пожаровзрывоопасность',
                            icon: 'Flame',
                            color: 'red',
                            risks: [
                              'Водород (4-75% об.) - взрывоопасен',
                              'Углеводороды C₅₊ - горючие',
                              'Высокая температура процесса',
                              'Статическое электричество',
                            ],
                          },
                          {
                            title: 'Токсичность',
                            icon: 'Skull',
                            color: 'purple',
                            risks: [
                              'Сероводород (H₂S) - ПДК 10 мг/м³',
                              'Бензол - канцероген 1 класса',
                              'Угарный газ (CO)',
                              'Меркаптаны и сульфиды',
                            ],
                          },
                          {
                            title: 'Высокие параметры',
                            icon: 'Gauge',
                            color: 'orange',
                            risks: [
                              'Давление до 40 атм',
                              'Температура до 520°C',
                              'Риск ожогов паром/нефтью',
                              'Разрушение оборудования',
                            ],
                          },
                          {
                            title: 'Электростатика',
                            icon: 'Zap',
                            color: 'yellow',
                            risks: [
                              'Заряды при движении жидкости',
                              'Искровые разряды',
                              'Воспламенение паров',
                              'Взрыв в замкнутом объеме',
                            ],
                          },
                        ].map((danger, idx) => (
                          <Card
                            key={idx}
                            className={`border-2 border-${danger.color}-300 hover:shadow-lg transition-shadow`}
                          >
                            <CardHeader className={`bg-${danger.color}-50`}>
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <Icon name={danger.icon as any} size={24} className={`text-${danger.color}-600`} />
                                {danger.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <ul className="space-y-2">
                                {danger.risks.map((risk, ridx) => (
                                  <li key={ridx} className="flex items-start gap-2 text-sm">
                                    <Icon name="AlertCircle" size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{risk}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <Card className="border-2 border-destructive/30 bg-red-50/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-destructive">
                            <Icon name="ShieldAlert" size={28} />
                            Критически важно!
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-800 font-medium leading-relaxed">
                            Все работы на установке каталитического риформинга относятся к
                            газоопасным работам 1-й группы и требуют обязательного наряда-допуска,
                            инструктажа и присутствия газоспасательной службы.
                          </p>
                        </CardContent>
                      </Card>

                      <div className="flex justify-end pt-4">
                        <Button
                          size="lg"
                          onClick={() => handleModuleComplete(module.id)}
                          disabled={module.completed}
                          className="gap-2"
                        >
                          {module.completed ? (
                            <>
                              <Icon name="Check" size={20} />
                              Модуль завершён
                            </>
                          ) : (
                            <>
                              Завершить модуль
                              <Icon name="ArrowRight" size={20} />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {module.id === 3 && (
                    <div className="space-y-6">
                      <div className="grid gap-4">
                        {scenarios.map((scenario) => (
                          <Card
                            key={scenario.id}
                            className={`border-2 ${
                              selectedScenario === scenario.id
                                ? 'border-primary shadow-lg'
                                : 'border-gray-200'
                            }`}
                          >
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <CardTitle className="text-xl">{scenario.title}</CardTitle>
                                    <Badge className={`${getDangerColor(scenario.danger)} font-bold`}>
                                      {getDangerLabel(scenario.danger)}
                                    </Badge>
                                  </div>
                                  <CardDescription className="text-base">
                                    {scenario.description}
                                  </CardDescription>
                                </div>
                                <Button
                                  variant={selectedScenario === scenario.id ? 'default' : 'outline'}
                                  onClick={() => {
                                    setSelectedScenario(scenario.id);
                                    resetScenario();
                                  }}
                                >
                                  {selectedScenario === scenario.id ? 'Выбрано' : 'Изучить'}
                                </Button>
                              </div>
                            </CardHeader>

                            {selectedScenario === scenario.id && (
                              <CardContent className="space-y-4">
                                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-5 border-2 border-red-200">
                                  <p className="text-sm font-semibold text-red-900 mb-2">
                                    СИТУАЦИЯ:
                                  </p>
                                  <p className="text-gray-800 leading-relaxed">{scenario.situation}</p>
                                </div>

                                <Separator />

                                <div>
                                  <p className="font-semibold text-gray-900 mb-3">
                                    Ваши действия:
                                  </p>
                                  <div className="space-y-3">
                                    {scenario.options.map((option, idx) => (
                                      <Button
                                        key={idx}
                                        variant={
                                          selectedOption === idx
                                            ? option.correct
                                              ? 'default'
                                              : 'destructive'
                                            : 'outline'
                                        }
                                        className={`w-full h-auto py-4 px-5 text-left justify-start ${
                                          selectedOption === idx && option.correct
                                            ? 'bg-accent hover:bg-accent/90 border-accent'
                                            : ''
                                        }`}
                                        onClick={() => handleScenarioAnswer(scenario.id, idx)}
                                        disabled={showFeedback}
                                      >
                                        <div className="flex items-start gap-3 w-full">
                                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold flex-shrink-0">
                                            {String.fromCharCode(65 + idx)}
                                          </div>
                                          <div className="flex-1">
                                            <p className="font-medium">{option.text}</p>
                                            {showFeedback && selectedOption === idx && (
                                              <div className="mt-3 pt-3 border-t border-white/30">
                                                <p className="text-sm opacity-95">{option.feedback}</p>
                                              </div>
                                            )}
                                          </div>
                                          {showFeedback && selectedOption === idx && (
                                            <Icon
                                              name={option.correct ? 'CheckCircle' : 'XCircle'}
                                              size={24}
                                              className="flex-shrink-0"
                                            />
                                          )}
                                        </div>
                                      </Button>
                                    ))}
                                  </div>
                                </div>

                                {showFeedback && (
                                  <div className="flex justify-end">
                                    <Button variant="outline" onClick={resetScenario}>
                                      <Icon name="RotateCcw" size={18} className="mr-2" />
                                      Попробовать снова
                                    </Button>
                                  </div>
                                )}
                              </CardContent>
                            )}
                          </Card>
                        ))}
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button
                          size="lg"
                          onClick={() => handleModuleComplete(module.id)}
                          disabled={module.completed}
                          className="gap-2"
                        >
                          {module.completed ? (
                            <>
                              <Icon name="Check" size={20} />
                              Модуль завершён
                            </>
                          ) : (
                            <>
                              Завершить модуль
                              <Icon name="ArrowRight" size={20} />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {module.id === 4 && (
                    <div className="space-y-6">
                      <Card className="border-2 border-primary/30">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                          <CardTitle className="flex items-center gap-2">
                            <Icon name="Gamepad2" size={28} className="text-primary" />
                            Интерактивный симулятор
                          </CardTitle>
                          <CardDescription>
                            Практические упражнения для отработки навыков
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid md:grid-cols-3 gap-4">
                            {[
                              {
                                title: 'VR-симуляция',
                                icon: 'Glasses',
                                description: 'Виртуальная реальность для отработки действий на установке',
                              },
                              {
                                title: 'Фото-кейсы',
                                icon: 'Camera',
                                description: 'Анализ реальных ситуаций по фотографиям',
                              },
                              {
                                title: 'Видео-разборы',
                                icon: 'Video',
                                description: 'Разбор аварийных случаев на видео',
                              },
                            ].map((item, idx) => (
                              <Card key={idx} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                  <Icon name={item.icon as any} size={40} className="text-primary mb-2" />
                                  <CardTitle className="text-lg">{item.title}</CardTitle>
                                  <CardDescription>{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <Button variant="outline" className="w-full">
                                    Начать
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex justify-end pt-4">
                        <Button
                          size="lg"
                          onClick={() => handleModuleComplete(module.id)}
                          disabled={module.completed}
                          className="gap-2"
                        >
                          {module.completed ? (
                            <>
                              <Icon name="Check" size={20} />
                              Модуль завершён
                            </>
                          ) : (
                            <>
                              Завершить модуль
                              <Icon name="ArrowRight" size={20} />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {module.id === 5 && (
                    <div className="space-y-6">
                      <Card className="border-2 border-accent/30 bg-gradient-to-br from-green-50 to-blue-50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-2xl">
                            <Icon name="Award" size={32} className="text-accent" />
                            Финальное тестирование
                          </CardTitle>
                          <CardDescription className="text-base">
                            Проверка усвоения материала всех модулей
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-5 border">
                              <h4 className="font-semibold text-gray-900 mb-3">Требования:</h4>
                              <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                  <Icon name="Check" size={16} className="text-accent" />
                                  Завершить все 4 модуля
                                </li>
                                <li className="flex items-center gap-2">
                                  <Icon name="Check" size={16} className="text-accent" />
                                  Набрать минимум 80% правильных ответов
                                </li>
                                <li className="flex items-center gap-2">
                                  <Icon name="Check" size={16} className="text-accent" />
                                  Время на тест: 60 минут
                                </li>
                              </ul>
                            </div>

                            <div className="bg-white rounded-lg p-5 border">
                              <h4 className="font-semibold text-gray-900 mb-3">Результат:</h4>
                              <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                  <Icon name="Award" size={16} className="text-accent" />
                                  Сертификат о прохождении обучения
                                </li>
                                <li className="flex items-center gap-2">
                                  <Icon name="FileCheck" size={16} className="text-accent" />
                                  Запись в личном деле
                                </li>
                                <li className="flex items-center gap-2">
                                  <Icon name="TrendingUp" size={16} className="text-accent" />
                                  Допуск к работе на установке
                                </li>
                              </ul>
                            </div>
                          </div>

                          <Separator />

                          <div className="text-center py-6">
                            <Button
                              size="lg"
                              className="bg-accent hover:bg-accent/90 gap-3 px-8"
                              onClick={() => {
                                setCertificateEarned(true);
                                handleModuleComplete(module.id);
                                toast({
                                  title: '🎉 Поздравляем!',
                                  description: 'Вы успешно завершили программу обучения!',
                                });
                              }}
                              disabled={completedModulesCount < 4}
                            >
                              <Icon name="PlayCircle" size={24} />
                              {completedModulesCount < 4
                                ? `Завершите ${4 - completedModulesCount} модуля для доступа`
                                : 'Начать финальный тест'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;