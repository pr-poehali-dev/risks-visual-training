import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
}

interface RiskScenario {
  id: number;
  title: string;
  description: string;
  options: {
    text: string;
    correct: boolean;
    explanation: string;
    riskLevel: 'low' | 'medium' | 'high';
  }[];
}

const Index = () => {
  const { toast } = useToast();
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: 'Первые шаги', icon: 'Footprints', unlocked: true },
    { id: '2', title: 'Теоретик', icon: 'BookOpen', unlocked: false },
    { id: '3', title: 'Практик', icon: 'Target', unlocked: false },
    { id: '4', title: 'Эксперт', icon: 'Award', unlocked: false },
  ]);

  const theoryCards = [
    {
      title: 'Типы рисков',
      icon: 'AlertTriangle',
      description: 'Технические, организационные и человеческие факторы риска при работе с установками.',
      color: 'bg-red-50 border-red-200',
    },
    {
      title: 'Оценка рисков',
      icon: 'BarChart3',
      description: 'Методы анализа и оценки уровня опасности: низкий, средний, высокий, критический.',
      color: 'bg-orange-50 border-orange-200',
    },
    {
      title: 'Меры безопасности',
      icon: 'Shield',
      description: 'СИЗ, процедуры, протоколы и правила работы для минимизации рисков.',
      color: 'bg-green-50 border-green-200',
    },
    {
      title: 'Реагирование',
      icon: 'AlertCircle',
      description: 'Действия в аварийных ситуациях, эвакуация и оказание первой помощи.',
      color: 'bg-blue-50 border-blue-200',
    },
  ];

  const scenarios: RiskScenario[] = [
    {
      id: 1,
      title: 'Запуск оборудования',
      description: 'Вы собираетесь запустить установку. Какое действие необходимо выполнить в первую очередь?',
      options: [
        {
          text: 'Нажать кнопку старта',
          correct: false,
          explanation: 'Запуск без проверки может привести к аварии!',
          riskLevel: 'high',
        },
        {
          text: 'Провести визуальный осмотр и проверку всех систем',
          correct: true,
          explanation: 'Правильно! Предварительная проверка — основа безопасности.',
          riskLevel: 'low',
        },
        {
          text: 'Позвать коллегу',
          correct: false,
          explanation: 'Хорошая идея, но сначала нужна проверка оборудования.',
          riskLevel: 'medium',
        },
      ],
    },
    {
      id: 2,
      title: 'Обнаружение утечки',
      description: 'Вы заметили небольшую утечку жидкости под установкой. Ваши действия?',
      options: [
        {
          text: 'Продолжить работу, это незначительно',
          correct: false,
          explanation: 'Даже небольшая утечка может стать серьезной проблемой!',
          riskLevel: 'high',
        },
        {
          text: 'Остановить установку и сообщить руководству',
          correct: true,
          explanation: 'Верно! Безопасность важнее производственных задач.',
          riskLevel: 'low',
        },
        {
          text: 'Подложить тряпку и продолжить',
          correct: false,
          explanation: 'Это не решение проблемы, а её маскировка!',
          riskLevel: 'high',
        },
      ],
    },
    {
      id: 3,
      title: 'Использование СИЗ',
      description: 'Перед началом работы вы обнаружили, что защитные очки повреждены. Что делать?',
      options: [
        {
          text: 'Работать без очков, быть осторожным',
          correct: false,
          explanation: 'СИЗ обязательны! Осторожность не заменит защиту.',
          riskLevel: 'high',
        },
        {
          text: 'Использовать обычные очки',
          correct: false,
          explanation: 'Обычные очки не обеспечивают необходимую защиту.',
          riskLevel: 'high',
        },
        {
          text: 'Получить новые защитные очки перед началом работы',
          correct: true,
          explanation: 'Правильно! Никогда не работайте с неисправными СИЗ.',
          riskLevel: 'low',
        },
      ],
    },
  ];

  const quizQuestions = [
    {
      question: 'Какой уровень риска требует немедленной остановки работ?',
      answers: ['Низкий', 'Средний', 'Высокий', 'Критический'],
      correct: 3,
    },
    {
      question: 'Как часто необходимо проводить инструктаж по технике безопасности?',
      answers: ['Раз в год', 'Раз в квартал', 'Перед каждой сменой', 'По необходимости'],
      correct: 1,
    },
    {
      question: 'Что является первым шагом в оценке рисков?',
      answers: [
        'Составление отчета',
        'Идентификация опасностей',
        'Разработка мер защиты',
        'Обучение персонала',
      ],
      correct: 1,
    },
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleScenarioChoice = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowResult(true);
    
    const option = scenarios[currentScenario].options[optionIndex];
    
    if (option.correct) {
      const earnedXP = 50;
      const earnedScore = 100;
      setXp(prev => {
        const newXp = prev + earnedXP;
        if (newXp >= 100) {
          setLevel(l => l + 1);
          toast({
            title: '🎉 Новый уровень!',
            description: `Поздравляем! Вы достигли ${level + 1} уровня!`,
          });
          return newXp - 100;
        }
        return newXp;
      });
      setTotalScore(prev => prev + earnedScore);
      
      toast({
        title: '✅ Правильно!',
        description: option.explanation,
      });
    } else {
      toast({
        title: '❌ Неверно',
        description: option.explanation,
        variant: 'destructive',
      });
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setShowResult(false);
      setSelectedOption(null);
    } else {
      toast({
        title: '🏆 Симуляция завершена!',
        description: 'Вы прошли все сценарии. Отличная работа!',
      });
      
      const newAchievements = [...achievements];
      newAchievements[2].unlocked = true;
      setAchievements(newAchievements);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (quizQuestions[currentQuiz].correct === answerIndex) {
      setQuizScore(prev => prev + 1);
      toast({
        title: '✅ Верно!',
        description: 'Отличное знание теории!',
      });
    } else {
      toast({
        title: '❌ Неправильно',
        description: 'Повторите теоретический материал.',
        variant: 'destructive',
      });
    }

    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(prev => prev + 1);
    } else {
      setQuizComplete(true);
      const newAchievements = [...achievements];
      newAchievements[1].unlocked = true;
      setAchievements(newAchievements);
      
      toast({
        title: '🎓 Тест завершён!',
        description: `Ваш результат: ${quizScore + (quizQuestions[currentQuiz].correct === answerIndex ? 1 : 0)} из ${quizQuestions.length}`,
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setQuizScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Риски моей установки 🎮
              </h1>
              <p className="text-gray-600">
                Интерактивная программа обучения безопасности
              </p>
            </div>
            
            <Card className="w-full md:w-auto border-2 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name="Trophy" className="text-yellow-500" size={20} />
                      <span className="text-2xl font-bold text-primary">{level}</span>
                    </div>
                    <p className="text-xs text-gray-500">Уровень</p>
                  </div>
                  
                  <div className="w-px h-12 bg-gray-200" />
                  
                  <div className="text-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name="Star" className="text-purple-500" size={20} />
                      <span className="text-2xl font-bold text-secondary">{totalScore}</span>
                    </div>
                    <p className="text-xs text-gray-500">Очки</p>
                  </div>
                  
                  <div className="w-px h-12 bg-gray-200" />
                  
                  <div className="min-w-32">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Zap" className="text-yellow-500" size={16} />
                      <span className="text-sm font-semibold">XP: {xp}/100</span>
                    </div>
                    <Progress value={xp} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-2">
            {achievements.map((achievement) => (
              <Badge
                key={achievement.id}
                variant={achievement.unlocked ? 'default' : 'outline'}
                className={`px-3 py-2 ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' : 'opacity-50'}`}
              >
                <Icon name={achievement.icon as any} size={16} className="mr-1" />
                {achievement.title}
              </Badge>
            ))}
          </div>
        </header>

        <Tabs defaultValue="theory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="theory" className="gap-2">
              <Icon name="BookOpen" size={18} />
              Теория
            </TabsTrigger>
            <TabsTrigger value="practice" className="gap-2">
              <Icon name="Gamepad2" size={18} />
              Практика
            </TabsTrigger>
            <TabsTrigger value="test" className="gap-2">
              <Icon name="ClipboardCheck" size={18} />
              Тесты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theory" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {theoryCards.map((card, index) => (
                <Card
                  key={index}
                  className={`game-card-hover border-2 ${card.color} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <Icon name={card.icon as any} size={32} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{card.title}</CardTitle>
                        <CardDescription className="text-base">
                          {card.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Icon name="ExternalLink" size={16} className="mr-2" />
                      Изучить подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <Card className="border-2 border-secondary/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      Сценарий {currentScenario + 1}/{scenarios.length}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {scenarios[currentScenario].title}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    <Icon name="Target" size={18} className="mr-2" />
                    Симулятор
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {scenarios[currentScenario].description}
                  </p>
                </div>

                <div className="space-y-3">
                  {scenarios[currentScenario].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedOption === index ? 'default' : 'outline'}
                      className={`w-full justify-start text-left h-auto py-4 px-6 ${
                        showResult && selectedOption === index
                          ? option.correct
                            ? 'bg-green-500 hover:bg-green-600 text-white border-green-600'
                            : 'bg-red-500 hover:bg-red-600 text-white border-red-600'
                          : ''
                      }`}
                      onClick={() => !showResult && handleScenarioChoice(index)}
                      disabled={showResult}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <span className="font-bold text-lg">{String.fromCharCode(65 + index)}.</span>
                        <div className="flex-1">
                          <p className="text-base">{option.text}</p>
                          {showResult && selectedOption === index && (
                            <p className="mt-2 text-sm opacity-90">{option.explanation}</p>
                          )}
                        </div>
                        {showResult && selectedOption === index && (
                          <Icon
                            name={option.correct ? 'Check' : 'X'}
                            size={24}
                            className="flex-shrink-0"
                          />
                        )}
                      </div>
                    </Button>
                  ))}
                </div>

                {showResult && (
                  <div className="flex justify-end">
                    <Button onClick={nextScenario} size="lg" className="gap-2">
                      {currentScenario < scenarios.length - 1 ? (
                        <>
                          Следующий сценарий
                          <Icon name="ArrowRight" size={20} />
                        </>
                      ) : (
                        <>
                          Завершить
                          <Icon name="Check" size={20} />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test" className="space-y-6">
            {!quizComplete ? (
              <Card className="border-2 border-accent/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        Вопрос {currentQuiz + 1}/{quizQuestions.length}
                      </CardTitle>
                      <CardDescription className="text-base">
                        Выберите правильный ответ
                      </CardDescription>
                    </div>
                    <Badge variant="default" className="text-lg px-4 py-2 bg-accent">
                      <Icon name="Brain" size={18} className="mr-2" />
                      Счёт: {quizScore}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <p className="text-xl font-semibold text-gray-800">
                      {quizQuestions[currentQuiz].question}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quizQuestions[currentQuiz].answers.map((answer, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto py-6 px-6 text-left justify-start hover:bg-purple-100 hover:border-purple-300"
                        onClick={() => handleQuizAnswer(index)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="text-base">{answer}</span>
                        </div>
                      </Button>
                    ))}
                  </div>

                  <Progress
                    value={((currentQuiz + 1) / quizQuestions.length) * 100}
                    className="h-2"
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-3xl text-center">
                    🎉 Тест завершён!
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="bg-white rounded-lg p-8 inline-block">
                    <p className="text-6xl font-bold text-primary mb-2">
                      {quizScore}/{quizQuestions.length}
                    </p>
                    <p className="text-xl text-gray-600">
                      {quizScore === quizQuestions.length
                        ? 'Превосходно!'
                        : quizScore >= quizQuestions.length / 2
                        ? 'Хороший результат!'
                        : 'Нужно повторить теорию'}
                    </p>
                  </div>
                  <Button onClick={resetQuiz} size="lg" className="gap-2">
                    <Icon name="RotateCcw" size={20} />
                    Пройти заново
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
